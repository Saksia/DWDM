import { Categoria } from "../entities/Categoria";
import { Injectable } from "@angular/core";
import { AbstractEntityFacade } from "../facades/AbstractEntityFacade";
import { CATEGORIAS } from "../db/db";
import { AppService } from "../services/AppService";

@Injectable()
export class CategoriaFacadeHttp extends AbstractEntityFacade{
    
    constructor(private http:AppService){ super(); }

    
    public create(entity: Categoria) { 
        var categoria = {
            nombre:entity.getNombre()
        }
        return this.http.doPost('categories',categoria);
    }
    
    public edit(entity: Categoria) { // EDIT
        var categoria = {
            nombre:entity.getNombre()
        }
        return this.http.doPut('categories/'+entity.getId(),categoria);
    }

  
    public remove(entity: Categoria) { // DELETE
        var categoria = {
            nombre:entity.getNombre()
        }
        return this.http.doDelete('categories/'+entity.getId(),categoria);
    }
    

    public find(id: Number) {
        return this.http.doGet('categories/'+id);
    }
   

    public findAll() {
        return this.http.doGet('categories');
    }
    
}