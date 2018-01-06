import { Entity } from "./Entity";

export class Categoria implements Entity {
    
    private id:Number;
    private nombre:String;
    
    constructor(nombre:String, id?:Number) {
      this.id = id;
      this.nombre = nombre;
    }

    public getId() { return this.id; } 

    public getNombre() { return this.nombre; } 
    
    public setNombre(nombre:String) { this.nombre = nombre; }
    
  }