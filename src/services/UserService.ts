import { Injectable } from "@angular/core";
import { Usuario } from "../entities/Usuario";
import { UsuarioFacadeHttp } from "../facadesHttp/UsuarioFacadeHttp";

@Injectable()
export class UserService {
    // private user: Usuario = new Usuario('Admin','111111111',true,1);
    // private user: Usuario = new Usuario('Usuario1','222222222',false,2);
    private user: Usuario;

    constructor(private usuarioFacade: UsuarioFacadeHttp){      
     }

    findAndSetUser(){
        var userId: string = localStorage.getItem("userId");
        var userAlias: string = localStorage.getItem("userAlias");
        var userTelephone: string = localStorage.getItem("userTelephone");
        var userAdmin: string = localStorage.getItem("userAdmin");
        if (userId == null || userAlias == null || userTelephone == null || userAdmin == null) return null;
        this.user = new Usuario(userAlias,userTelephone,userAdmin == "true" ? true : false, Number(userId));
        return this.user;
    }

    getUser(){
        return this.user;
    }

    setUser(user: Usuario){
        this.user = user;
        this.storeUserInLocalStorage();
    }

    private storeUserInLocalStorage(){
        localStorage.setItem("userId", this.user.getId().toString());
        localStorage.setItem("userAlias", this.user.getAlias().toString());
        localStorage.setItem("userTelephone", this.user.getTelefono().toString());
        localStorage.setItem("userAdmin", this.user.getAdministrador().toString());
    }

}