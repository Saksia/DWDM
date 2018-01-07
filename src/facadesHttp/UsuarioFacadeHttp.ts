import { Usuario } from "../entities/Usuario";
import { CholloFacadeHttp } from "./CholloFacadeHttp";
import { Chollo } from "../entities/Chollo";
import { Injectable } from "@angular/core";
import { AbstractEntityFacade } from "../facades/AbstractEntityFacade";
import { USUARIOS } from "../db/db";
import { AppService } from "../services/AppService";

@Injectable()
export class UsuarioFacadeHttp extends AbstractEntityFacade{
    
    items : any;
    item : any;
    constructor(private cholloFacade:CholloFacadeHttp, public appService: AppService) { super(); }
    // INSERT INTO usuario (telefono,alias,administrador) VALUES ("111111111","jaime",1);
    public create(entity: Usuario) { // INSERT + DEVOLVER ENTITY CON EL ULTIMO ID  

        var data = { telefono : entity.getTelefono(), alias : entity.getAlias() };
        
        return this.appService.doPost('users',data)

    }

    // UPDATE usuario SET telefono="?",alias="?",administrador=? WHERE id=?;
    public edit(entity: Usuario) { // EDIT
        var usuario: Usuario = this.find(entity.getId());
        usuario.setAlias(entity.getAlias());
        usuario.setTelefono(entity.getTelefono());
        usuario.setAdministrador(entity.getAdministrador());
    }
    // DELETE FROM usuario WHERE id=?;
    public remove(entity: Usuario) { // DELETE
        USUARIOS.forEach(
            (usuario, index) => {
                if (usuario.getId() == entity.getId()) USUARIOS.splice(index, 1);
            }
        ); 
    }
    // SELECT * FROM usuario WHERE id=?;
    public find(id: Number) {
        return this.findAll().find(
            (usuario) => usuario.getId() == id 
        );
    }
    // SELECT * FROM usuario;
    public findAll() {
        this.appService.doGet('users').subscribe(response=>{
            this.items = response.json();
            }
        );
        return USUARIOS;
    }

    // SELECT * FROM usuario WHERE telefono=?;
    public findByTelephone(telefono: String) {

        this.appService.doGet('users?telefono='+telefono).subscribe(response=>{
            this.item = response.json();
        });

        return this.item;
        
    }

    // SELECT * FROM usuario WHERE alias=?;
    public findByAlias(alias: String) {
        return this.findAll().find(
            (usuario) => usuario.getAlias() == alias
        );
    }

    public getLikesOf(usuario: Usuario){
        var chollos:Chollo[] = this.cholloFacade.findByUser(usuario);
        var likes: number = 0;
        chollos.forEach(
            (chollo) => likes += this.cholloFacade.getLikesCountFor(chollo)          
        );
        return likes;
    }
    
    public getDislikesOf(usuario: Usuario){
        var chollos:Chollo[] = this.cholloFacade.findByUser(usuario);
        var dislikes: number = 0;
        chollos.forEach(
            (chollo) => dislikes += this.cholloFacade.getDislikesCountFor(chollo)
        );
        return dislikes;
    }
}