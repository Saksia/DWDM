import { Chollo } from "../entities/Chollo";
import { Usuario } from "../entities/Usuario";
import { FavoritoFacade } from "./FavoritoFacade";
import { ReaccionFacade } from "./ReaccionFacade";
import { Categoria } from "../entities/Categoria";
import { Injectable } from "@angular/core";
import { AbstractEntityFacade } from "./AbstractEntityFacade";
import { CHOLLOS } from "../db/db";

@Injectable()
export class CholloFacade extends AbstractEntityFacade{
    
    constructor(private favoritoFacade:FavoritoFacade, private reaccionFacade:ReaccionFacade){ super(); }
    // INSERT INTO chollo (titulo,enlace,descripcion,precioAntes,precioDespues,fechaCreacion,fechaActualizacion,empresaNoPatrocinada,empresaPatrocinada,usuario,categoria) VALUES (?,?,?,?,?,?,?,?,?,?,?);
    public create(entity: Chollo) { // INSERT + DEVOLVER ENTITY CON EL ULTIMO ID
        this.findAll().push(entity); 
        return entity;
    }
    // UPDATE chollo SET titulo=?,enlace=?,descripcion=?,precioAntes=?,precioDespues=?,fechaCreacion=?,fechaActualizacion=?,empresaNoPatrocinada=?,empresaPatrocinada=?,usuario=?,categoria=? WHERE id=?;
    public edit(entity: Chollo) { // EDIT
        var chollo: Chollo = this.find(entity.getId());
        chollo.setTitulo(entity.getTitulo());
        chollo.setEnlace(entity.getEnlace());
        chollo.setDescripcion(entity.getDescripcion());
        chollo.setPrecioAntes(entity.getPrecioAntes());
        chollo.setPrecioDespues(entity.getPrecioDespues());
        chollo.setFechaActualizacion(entity.getFechaActualizacion());
        chollo.setEmpresaPatrocinada(entity.getEmpresaPatrocinada());
        chollo.setEmpresaNoPatrocinada(entity.getEmpresaNoPatrocinada());
        chollo.setCategoria(entity.getCategoria());
    }
    // DELETE FROM chollo WHERE id=?;
    public remove(entity: Chollo) { // DELETE
        CHOLLOS.forEach(
            (chollo, index) => {
                if (chollo.getId() === entity.getId()) CHOLLOS.splice(index, 1);
            }
        );

        this.favoritoFacade.removeWithSave(entity);
        this.reaccionFacade.removeWithSave(entity);
    }
    // SELECT chollo.id AS cholloId,chollo.titulo,chollo.enlace,chollo.descripcion,chollo.precioAntes,chollo.precioDespues,chollo.fechaCreacion,chollo.fechaActualizacion,chollo.empresaNoPatrocinada,
    // usuario.id AS usuarioId,usuario.telefono,usuario.alias,usuario.administrador,
    // categoria.id AS categoriaID, categoria.nombre AS categoriaNombre,
    // empresaPatrocinada.id AS empresaPatrocinadaID, empresaPatrocinada.nombre AS empresaPatrocinadaNombre
    // FROM (((chollo
    // INNER JOIN usuario ON chollo.usuario = usuario.id)
    // INNER JOIN categoria ON chollo.categoria = categoria.id)
    // INNER JOIN empresaPatrocinada ON chollo.empresaPatrocinada = empresaPatrocinada.id)
    // WHERE chollo.id=?;
    public find(id: Number) {
        return this.findAll().find(
            (chollo) => chollo.getId() == id 
        );
    }
    // SELECT chollo.id AS cholloId,chollo.titulo,chollo.enlace,chollo.descripcion,chollo.precioAntes,chollo.precioDespues,chollo.fechaCreacion,chollo.fechaActualizacion,chollo.empresaNoPatrocinada,
    // usuario.id AS usuarioId,usuario.telefono,usuario.alias,usuario.administrador,
    // categoria.id AS categoriaID, categoria.nombre AS categoriaNombre,
    // empresaPatrocinada.id AS empresaPatrocinadaID, empresaPatrocinada.nombre AS empresaPatrocinadaNombre
    // FROM (((chollo
    // INNER JOIN usuario ON chollo.usuario = usuario.id)
    // INNER JOIN categoria ON chollo.categoria = categoria.id)
    // INNER JOIN empresaPatrocinada ON chollo.empresaPatrocinada = empresaPatrocinada.id);
    public findAll() {
        return CHOLLOS;
    }

    // SELECT chollo.id AS cholloId,chollo.titulo,chollo.enlace,chollo.descripcion,chollo.precioAntes,chollo.precioDespues,chollo.fechaCreacion,chollo.fechaActualizacion,chollo.empresaNoPatrocinada,
    // usuario.id AS usuarioId,usuario.telefono,usuario.alias,usuario.administrador,
    // categoria.id AS categoriaID, categoria.nombre AS categoriaNombre,
    // empresaPatrocinada.id AS empresaPatrocinadaID, empresaPatrocinada.nombre AS empresaPatrocinadaNombre
    // FROM (((chollo
    // INNER JOIN usuario ON chollo.usuario = usuario.id)
    // INNER JOIN categoria ON chollo.categoria = categoria.id)
    // INNER JOIN empresaPatrocinada ON chollo.empresaPatrocinada = empresaPatrocinada.id)
    // WHERE chollo.usuario=?;
    public findByUser(user: Usuario){
        return this.findAll().filter(
            (chollo) => chollo.getUsuario().getId() == user.getId() 
        );
    }
    // SELECT chollo.id AS cholloId,chollo.titulo,chollo.enlace,chollo.descripcion,chollo.precioAntes,chollo.precioDespues,chollo.fechaCreacion,chollo.fechaActualizacion,chollo.empresaNoPatrocinada,
    // usuario.id AS usuarioId,usuario.telefono,usuario.alias,usuario.administrador,
    // categoria.id AS categoriaID, categoria.nombre AS categoriaNombre,
    // empresaPatrocinada.id AS empresaPatrocinadaID, empresaPatrocinada.nombre AS empresaPatrocinadaNombre
    // FROM (((chollo
    // INNER JOIN usuario ON chollo.usuario = usuario.id)
    // INNER JOIN categoria ON chollo.categoria = categoria.id)
    // INNER JOIN empresaPatrocinada ON chollo.empresaPatrocinada = empresaPatrocinada.id)
    // WHERE chollo.categoria=?;
    public findByCategory(categoria:Categoria){
        return this.findAll().filter(
            (chollo) => chollo.getCategoria().getId() == categoria.getId() 
        );
    }

    public findPopulars(){
        return this.findAll().sort(
            (chollo2, chollo1) => (this.getLikesCountFor(chollo1) - this.getDislikesCountFor(chollo1)) - (this.getLikesCountFor(chollo2) - this.getDislikesCountFor(chollo2))
        );
    }

    // SELECT 
    // chollo.id AS cholloId,chollo.titulo,chollo.enlace,chollo.descripcion,chollo.precioAntes,chollo.precioDespues,chollo.fechaCreacion,chollo.fechaActualizacion,chollo.empresaNoPatrocinada,
    // empresaPatrocinada.id AS empresaPatrocinadaID, empresaPatrocinada.nombre AS empresaPatrocinadaNombre,
    // categoria.id AS categoriaID, categoria.nombre AS categoriaNombre
    // FROM (((favorito
    // INNER JOIN chollo ON favorito.chollo = chollo.id)
    // INNER JOIN categoria ON chollo.categoria = categoria.id)
    // INNER JOIN empresaPatrocinada ON chollo.empresaPatrocinada= empresaPatrocinada.id)
    // WHERE favorito.usuario=?;
    public findFavouritesByUser(user: Usuario){
        return this.favoritoFacade.findAll().filter(
            (favorito) => favorito.getUsuario().getId() == user.getId() 
        ).map(
            (favorito) => favorito.getChollo()
        );
    }
    // SELECT COUNT(*)
    // FROM (reaccion
    // INNER JOIN chollo ON reaccion.chollo = chollo.id)
    // WHERE chollo.id=?
    // AND reaccion.positiva=1;
    public getLikesCountFor(chollo: Chollo){
        return this.reaccionFacade.findAll().filter(
            (reaccion) => reaccion.getChollo().getId() == chollo.getId() && reaccion.getPositiva() == true
        ).length;
    }
    // SELECT COUNT(*)
    // FROM (reaccion
    // INNER JOIN chollo ON reaccion.chollo = chollo.id)
    // WHERE chollo.id=?
    // AND reaccion.positiva=0;
    public getDislikesCountFor(chollo: Chollo){
        return this.reaccionFacade.findAll().filter(
            (reaccion) => reaccion.getChollo().getId() == chollo.getId() && reaccion.getPositiva() == false
        ).length;
    }
    
}