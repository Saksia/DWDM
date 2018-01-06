import { EmpresaPatrocinada } from "./EmpresaPatrocinada";
import { Usuario } from "./Usuario";
import { Categoria } from "./Categoria";
import { Entity } from "./Entity";

export class Chollo implements Entity{
//#region attributes    
    private id:Number;
    private titulo:String;
    private enlace:String;
    private descripcion:String;
    private precioAntes:Number;
    private precioDespues:Number;
    private fechaCreacion:Date;
    private fechaActualizacion:Date;
    private empresaNoPatrocinada:String;
    private empresaPatrocinada:EmpresaPatrocinada;
    private usuario:Usuario;
    private categoria:Categoria;
//#endregion

    constructor(titulo:String, enlace:String, descripcion:String, precioAntes:Number, precioDespues:Number, fechaCreacion:Date, fechaActualizacion:Date, empresaNoPatrocinada:String, empresaPatrocinada:EmpresaPatrocinada, usuario:Usuario, categoria:Categoria, id?:Number) {
        this.id = id;
        this.titulo = titulo;
        this.enlace = enlace;
        this.descripcion = descripcion;
        this.precioAntes = precioAntes;
        this.precioDespues = precioDespues;
        this.fechaCreacion = fechaCreacion;
        this.fechaActualizacion = fechaActualizacion;
        this.empresaPatrocinada = empresaPatrocinada;
        this.empresaNoPatrocinada = empresaNoPatrocinada;
        this.usuario = usuario;
        this.categoria = categoria;
    }
//#region getters
    public getId(){ return this.id; }

    public getTitulo(){ return this.titulo; }

    public getEnlace(){ return this.enlace; }

    public getDescripcion(){ return this.descripcion; }

    public getPrecioAntes(){ return this.precioAntes; }

    public getPrecioDespues(){ return this.precioDespues; }

    public getFechaCreacion(){ return this.fechaCreacion; }

    public getFechaActualizacion(){ return this.fechaActualizacion; }

    public getEmpresaPatrocinada(){ return this.empresaPatrocinada; }

    public getEmpresaNoPatrocinada(){ return this.empresaNoPatrocinada; }

    public getUsuario(){ return this.usuario; }

    public getCategoria(){ return this.categoria; }
//#endregion

//#region setters
    public setTitulo(titulo:String){ this.titulo = titulo; }

    public setEnlace(enlace:String){ this.enlace = enlace; }

    public setDescripcion(descripcion:String){ this.descripcion = descripcion; }

    public setPrecioAntes(precioAntes:Number){ this.precioAntes = precioAntes; }

    public setPrecioDespues(precioDespues:Number){ this.precioDespues = precioDespues; }

    public setFechaActualizacion(fechaActualizacion:Date){ this.fechaActualizacion = fechaActualizacion; }

    public setEmpresaPatrocinada(empresaPatrocinada:EmpresaPatrocinada){ this.empresaPatrocinada = empresaPatrocinada; }

    public setEmpresaNoPatrocinada(empresaNoPatrocinada:String){ this.empresaNoPatrocinada = empresaNoPatrocinada; }

    public setCategoria(categoria:Categoria){ this.categoria = categoria; }
//#endregion


}