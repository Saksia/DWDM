import { Chollo } from "../entities/Chollo";
import { Favorito } from "../entities/Favorito";
import { Injectable } from "@angular/core";
import { AbstractSaveUserRelationFacade } from "./AbstractSaveUserRelationFacade";
import { SaveUserRelation } from "../entities/SaveUserRelation";
import { FAVORITOS } from "../db/db";

@Injectable()
export class FavoritoFacade extends AbstractSaveUserRelationFacade{
    
    // INSERT INTO favorito (chollo,usuario) VALUES (?,?);
    public create(saveUserRelation:SaveUserRelation) { // INSERT
        this.findAll().push(saveUserRelation as Favorito); 
    }
    // DELETE FROM favorito WHERE chollo=? AND usuario=?;
    public remove(saveUserRelation:SaveUserRelation) { // DELETE
        FAVORITOS.forEach(
            (favorito, index) => {
                if (favorito.getUsuario().getId() == saveUserRelation.getUsuario().getId() && favorito.getChollo().getId() == saveUserRelation.getChollo().getId())
                    FAVORITOS.splice(index, 1);
            }
        );
    }
    // SELECT usuario.id AS usuarioId,usuario.telefono,usuario.alias,usuario.administrador,
    // chollo.id AS cholloId,chollo.titulo,chollo.enlace,chollo.descripcion,chollo.precioAntes,chollo.precioDespues,chollo.fechaCreacion,chollo.fechaActualizacion,chollo.empresaNoPatrocinada,
    // empresaPatrocinada.id AS empresaPatrocinadaID, empresaPatrocinada.nombre AS empresaPatrocinadaNombre,
    // categoria.id AS categoriaID, categoria.nombre AS categoriaNombre
    // FROM ((((favorito
    // INNER JOIN usuario ON favorito.usuario = usuario.id)
    // INNER JOIN chollo ON favorito.chollo = chollo.id)
    // INNER JOIN categoria ON chollo.categoria = categoria.id)
    // INNER JOIN empresaPatrocinada ON chollo.empresaPatrocinada= empresaPatrocinada.id)
    // WHERE favorito.chollo=? AND favorito.usuario=?;
    public find(saveUserRelation:SaveUserRelation) {
        return this.findAll().find(
            (favorito) => favorito.getUsuario().getId() == saveUserRelation.getUsuario().getId() && favorito.getChollo().getId() == saveUserRelation.getChollo().getId()
        );
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