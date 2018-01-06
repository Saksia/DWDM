import { Chollo } from "./Chollo";
import { Usuario } from "./Usuario";

export abstract class SaveUserRelation {
    
    private chollo:Chollo;
    private usuario:Usuario;
    
    constructor(chollo:Chollo, usuario:Usuario) {
      this.chollo = chollo;
      this.usuario = usuario;
    }

    public getChollo() { return this.chollo; } 

    public getUsuario() { return this.usuario; } 
}