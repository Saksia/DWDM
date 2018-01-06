import { Categoria } from "../entities/Categoria";
import { Injectable } from "@angular/core";
import { AbstractEntityFacade } from "./AbstractEntityFacade";
import { CATEGORIAS } from "../db/db";

@Injectable()
export class CategoriaFacade extends AbstractEntityFacade{
    
    // INSERT INTO categoria (nombre) VALUES (?);
    public create(entity: Categoria) { // INSERT + DEVOLVER ENTITY CON EL ULTIMO ID
        this.findAll().push(entity); 
        return entity;
    }
    // UPDATE categoria SET nombre="?" WHERE id=?;
    public edit(entity: Categoria) { // EDIT
        var categoria: Categoria = this.find(entity.getId());
        categoria.setNombre(entity.getNombre());
    }
    // DELETE FROM categoria WHERE id=?;
    public remove(entity: Categoria) { // DELETE
        CATEGORIAS.forEach(
            (categoria, index) => {
                if (categoria.getId() === entity.getId()) CATEGORIAS.splice(index, 1);
            }
        );
    }
    // SELECT * FROM categoria WHERE id=?;
    public find(id: Number) {
        return this.findAll().find(
            (categoria) => categoria.getId() == id 
        );
    }
    // SELECT * FROM categoria;
    public findAll() {
        return CATEGORIAS;
    }
    
}