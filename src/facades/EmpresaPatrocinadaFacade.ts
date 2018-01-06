import { EmpresaPatrocinada } from "../entities/EmpresaPatrocinada";
import { Injectable } from "@angular/core";
import { AbstractEntityFacade } from "./AbstractEntityFacade";
import { EMPRESAS_PATROCINADAS } from "../db/db";

@Injectable()
export class EmpresaPatrocinadaFacade extends AbstractEntityFacade{
    // INSERT INTO empresaPatrocinada (nombre) VALUES (?);
    public create(entity: EmpresaPatrocinada) { // INSERT + DEVOLVER ENTITY CON EL ULTIMO ID
        this.findAll().push(entity); 
        return entity;
    }
    // UPDATE empresaPatrocinada SET nombre="?" WHERE id=?;
    public edit(entity: EmpresaPatrocinada) { // EDIT
        var empresaPatrocinada: EmpresaPatrocinada = this.find(entity.getId());
        empresaPatrocinada.setNombre(entity.getNombre());
    }
    // DELETE FROM empresaPatrocinada WHERE id=?;
    public remove(entity: EmpresaPatrocinada) { // DELETE
        EMPRESAS_PATROCINADAS.forEach(
            (empresaPatrocinada, index) => {
                if (empresaPatrocinada.getId() === entity.getId()) EMPRESAS_PATROCINADAS.splice(index, 1);
            }
        );
    }
    // SELECT * FROM empresaPatrocinada WHERE id=?;
    public find(id: Number) {
        return this.findAll().find(
            (empresaPatrocinada) => empresaPatrocinada.getId() == id 
        );
    }
    // SELECT * FROM empresaPatrocinada;
    public findAll() {
        return EMPRESAS_PATROCINADAS;
    }
    
}