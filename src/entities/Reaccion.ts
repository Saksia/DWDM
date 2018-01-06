import { Chollo } from "./Chollo";
import { Usuario } from "./Usuario";
import { SaveUserRelation } from "./SaveUserRelation";

export class Reaccion extends SaveUserRelation{
    
    private positiva:Boolean
    
    constructor(chollo:Chollo, usuario:Usuario, positiva:Boolean) {
      super(chollo, usuario);
      this.positiva = positiva;
    }
       
    public getPositiva() { return this.positiva; } 

    public setPositiva(positiva:Boolean){ this.positiva = positiva; }

  }