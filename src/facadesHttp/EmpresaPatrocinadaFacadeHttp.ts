import { EmpresaPatrocinada } from "../entities/EmpresaPatrocinada";
import { Injectable } from "@angular/core";
import { AbstractEntityFacade } from "../facades/AbstractEntityFacade";
import { EMPRESAS_PATROCINADAS } from "../db/db";
import { AppService } from "../services/AppService";

@Injectable()
export class EmpresaPatrocinadaFacadeHttp extends AbstractEntityFacade{
    
    constructor(private http:AppService){ super(); }

    public create(entity: EmpresaPatrocinada) {
        
        var empresaPatrocinada = {
            nombre: entity.getNombre()
        }
        return this.http.doPost('companies',empresaPatrocinada);
        
    }

    public edit(entity: EmpresaPatrocinada) { 
        var empresaPatrocinada = {
            nombre:entity.getNombre()
        }
        return this.http.doPut('companies/'+entity.getId(),empresaPatrocinada);
    }
   
    public remove(entity: EmpresaPatrocinada) { 

        var empresapatrocinada = {
            nombre:entity.getNombre()
        }

        return this.http.doDelete('companies/'+entity.getId(),empresapatrocinada);
    }


    public find(id: Number) {
        return this.http.doGet('companies/'+id);
    }


    public findAll() {
        return this.http.doGet('companies');
    }
    
}