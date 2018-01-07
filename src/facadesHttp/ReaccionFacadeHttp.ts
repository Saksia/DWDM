import { Reaccion } from "../entities/Reaccion";
import { Chollo } from "../entities/Chollo";
import { Injectable } from "@angular/core";
import { AbstractSaveUserRelationFacade } from "../facades/AbstractSaveUserRelationFacade";
import { SaveUserRelation } from "../entities/SaveUserRelation";
import { REACCIONES } from "../db/db";
import { AppService } from "../services/AppService";


@Injectable()
export class ReaccionFacadeHttp extends AbstractSaveUserRelationFacade{

    constructor(private http:AppService){super();}
 

    public create(saveUserRelation:SaveUserRelation) { // INSERT
        var reaccion = {
            chollo:saveUserRelation.getChollo().getId(),
            usuario:saveUserRelation.getUsuario().getId(),
            positiva:(saveUserRelation as Reaccion).getPositiva()
        }
        return this.http.doPost('reactions',reaccion);
    }

    public edit(saveUserRelation: Reaccion) { // EDIT
        var reaccion = {
            chollo:saveUserRelation.getChollo().getId(),
            usuario:saveUserRelation.getUsuario().getId(),
            positiva:(saveUserRelation as Reaccion).getPositiva()
        }
        return this.http.doPut('reactions',reaccion);
    }

    public remove(saveUserRelation:SaveUserRelation) { // DELETE
        var reaccion = {
            chollo:saveUserRelation.getChollo().getId(),
            usuario:saveUserRelation.getUsuario().getId(),
            positiva:(saveUserRelation as Reaccion).getPositiva()
        }
        return this.http.doDelete('reactions?chollo=' + reaccion.chollo + '&usuario=' + reaccion.usuario,reaccion);
    }

    public find(saveUserRelation: Reaccion) {
        return this.findAll().find(
            (reaccion) => 
                reaccion.getUsuario().getId() == saveUserRelation.getUsuario().getId() && 
                reaccion.getChollo().getId() == saveUserRelation.getChollo().getId()
        );
    }

    public findByPositiva(saveUserRelation: Reaccion) {
        var reaccion = {
            chollo:saveUserRelation.getChollo().getId(),
            usuario:saveUserRelation.getUsuario().getId(),
            positiva:saveUserRelation.getPositiva()
        }
        return this.http.doGet('reactions?chollo=' + reaccion.chollo + '&usuario=' + reaccion.usuario + '&positiva=' + reaccion.positiva);
    }

    // SOBRA PARA LA BD
    public findAll() {
        return REACCIONES;
    }
    // SOBRA PARA LA BD
    public removeWithSave(chollo:Chollo){
        REACCIONES.forEach(
            (reaccion, index) => {
                if (reaccion.getChollo().getId() === chollo.getId()) REACCIONES.splice(index, 1);
            }
        );
    }

}