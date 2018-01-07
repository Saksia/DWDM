import { Chollo } from "../entities/Chollo";
import { Usuario } from "../entities/Usuario";
import { FavoritoFacadeHttp } from "./FavoritoFacadeHttp";
import { ReaccionFacadeHttp } from "./ReaccionFacadeHttp";
import { Categoria } from "../entities/Categoria";
import { Injectable } from "@angular/core";
import { AbstractEntityFacade } from "../facades/AbstractEntityFacade";
import { CHOLLOS } from "../db/db";
import { AppService } from "../services/AppService";

@Injectable()
export class CholloFacadeHttp extends AbstractEntityFacade{
    
    constructor(private favoritoFacade:FavoritoFacadeHttp, private reaccionFacade:ReaccionFacadeHttp, private http:AppService){ super(); }
   
    public create(entity: Chollo) { // INSERT + DEVOLVER ENTITY CON EL ULTIMO ID
        
        var chollo= {
            titulo: entity.getTitulo(),
            enlace: entity.getEnlace(),
            descripcion: entity.getDescripcion(),
            precioAntes: entity.getPrecioAntes(),
            precioDespues: entity.getPrecioDespues(),
            empresaPatrocinada: entity.getEmpresaPatrocinada().getId(),
            empresaNoPatrocinada: entity.getEmpresaNoPatrocinada(),
            categoria: entity.getCategoria().getId(),
            usuario: entity.getUsuario().getId(),
        };

        return this.http.doPost('saves',chollo);
    }
   
    public edit(entity: Chollo) { // EDIT

        var chollo= {
            titulo: entity.getTitulo(),
            enlace: entity.getEnlace(),
            descripcion: entity.getDescripcion(),
            precioAntes: entity.getPrecioAntes(),
            precioDespues: entity.getPrecioDespues(),
            empresaPatrocinada: entity.getEmpresaPatrocinada().getId(),
            empresaNoPatrocinada: entity.getEmpresaNoPatrocinada(),
            categoria: entity.getCategoria().getId()
        };

        this.http.doPut('/saves/'+entity.getId(),chollo);
    }

    public remove(entity: Chollo) { // DELETE
        CHOLLOS.forEach(
            (chollo, index) => {
                if (chollo.getId() === entity.getId()) CHOLLOS.splice(index, 1);
            }
        );

        this.favoritoFacade.removeWithSave(entity);
        this.reaccionFacade.removeWithSave(entity);
    }

    public find(id: Number) {
        return this.http.doGet('saves/'+id);
    }

    public findAll() {
        var res;
        return this.http.doGet('saves');
    }

    public findByUser(user: Usuario){
        return this.http.doGet('users/'+user.getId()+'/saves');
    }


    public findByCategory(categoria:Categoria){
        return this.http.doGet('categories/'+categoria.getId()+'/saves');
    }

    public findPopulars(){
        return this.http.doGet('saves?populars=true');
    }

    public findFavouritesByUser(user: Usuario){
        return this.favoritoFacade.findAll().filter(
            (favorito) => favorito.getUsuario().getId() == user.getId() 
        ).map(
            (favorito) => favorito.getChollo()
        );
    }


    public getLikesCountFor(chollo: Chollo){
        return this.reaccionFacade.findAll().filter(
            (reaccion) => reaccion.getChollo().getId() == chollo.getId() && reaccion.getPositiva() == true
        ).length;
    }

    public getDislikesCountFor(chollo: Chollo){
        return this.reaccionFacade.findAll().filter(
            (reaccion) => reaccion.getChollo().getId() == chollo.getId() && reaccion.getPositiva() == false
        ).length;
    }
    
}