import { Entity } from "./Entity";

export class Usuario implements Entity{
    
    private id:Number;
    private alias:String;
    private telefono:String;
    private administrador:Boolean;
    
    constructor(alias:String, telefono:String, administrador:Boolean, id?:Number) {
      this.id = id;
      this.alias = alias;
      this.telefono = telefono;
      this.administrador = administrador;
    }
  
    public getId() { return this.id; } 

    public getAlias() { return this.alias; } 

    public getTelefono() { return this.telefono; } 

    public getAdministrador() { return this.administrador; } 

    public setAlias(alias:String){ this.alias = alias };

    public setTelefono(telefono:String){ this.telefono = telefono };

    public setAdministrador(administrador:Boolean){ this.administrador = administrador };
    
  }