import { Chollo } from "../entities/Chollo";
import { Favorito } from "../entities/Favorito";
import { Injectable } from "@angular/core";
import { AbstractSaveUserRelationFacade } from "../facades/AbstractSaveUserRelationFacade";
import { SaveUserRelation } from "../entities/SaveUserRelation";
import { FAVORITOS } from "../db/db";
import { AppService } from "../services/AppService";

@Injectable()
export class FavoritoFacadeHttp extends AbstractSaveUserRelationFacade{
    
    constructor(private http:AppService){super();}

    // INSERT INTO favorito (chollo,usuario) VALUES (?,?);
    public create(saveUserRelation:SaveUserRelation) { // INSERT
        var favorito = {
            chollo:saveUserRelation.getChollo().getId(),
            usuario:saveUserRelation.getUsuario().getId()
        }
        return this.http.doPost('favorites?chollo=' + favorito.chollo + '&usuario=' + favorito.usuario,favorito);
    }
    // DELETE FROM favorito WHERE chollo=? AND usuario=?;
    public remove(saveUserRelation:SaveUserRelation) { // DELETE
        var favorito = {
            chollo:saveUserRelation.getChollo().getId(),
            usuario:saveUserRelation.getUsuario().getId()
        }
        return this.http.doDelete('favorites?chollo=' + favorito.chollo + '&usuario=' + favorito.usuario,favorito);
    }

    public find(saveUserRelation:SaveUserRelation) {
        return this.http.doGet('favorites?chollo='+saveUserRelation.getChollo().getId()+'&usuario='+saveUserRelation.getUsuario().getId());
    }
    // SOBRA PARA LA BD
    public findAll() {
        return FAVORITOS;
    }
    // SOBRA PARA LA BD
    public removeWithSave(chollo:Chollo){
        FAVORITOS.forEach(
            (favorito, index) => {
                if (favorito.getChollo().getId() === chollo.getId()) FAVORITOS.splice(index, 1);
            }
        );
    }
    
}