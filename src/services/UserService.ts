import { Injectable } from "@angular/core";
import { Usuario } from "../entities/Usuario";
import { UsuarioFacadeHttp } from "../facadesHttp/UsuarioFacadeHttp";

@Injectable()
export class UserService {
    private user: Usuario = new Usuario('Admin','111111111',true,1);
    // private user: Usuario = new Usuario('Usuario1','222222222',false,2);
    //private user: Usuario;

    constructor(private usuarioFacade: UsuarioFacadeHttp){
       // var userId: string = localStorage.getItem("userId")
      //  if (userId == null) return;
      // this.user = this.usuarioFacade.find(Number(userId));
     }

    getUser(){
        return this.user;
    }

    setUser(telefono: String){
        this.user = this.usuarioFacade.findByTelephone(telefono);
        if(this.user != null) this.storeUserInLocalStorage();
        return this.user;
    }

    createUser(telefono: String, alias: String){
        if(this.usuarioFacade.findByAlias(alias) != null) return null;
        
        this.usuarioFacade.create(new Usuario(
            alias,
            telefono,
            false)
        ).subscribe((res:any )=> {
            this.user = new Usuario(res.json().alias, res.json().telefono, false, res.json().id);
        });

        this.storeUserInLocalStorage();
        return this.user;
    }

    private storeUserInLocalStorage(){
        localStorage.setItem("userId", this.user.getId().toString())
    }

}