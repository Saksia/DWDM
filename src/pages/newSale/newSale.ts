import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DetailsPage } from '../details/details';
import { NavParams } from 'ionic-angular/navigation/nav-params';
import { Chollo } from '../../entities/Chollo';
import { EmpresaPatrocinada } from '../../entities/EmpresaPatrocinada';
import { Usuario } from '../../entities/Usuario';
import { Categoria } from '../../entities/Categoria';
import { UserService } from '../../services/UserService';
import { TabsControllerPage } from '../tabs-controller/tabs-controller';
import { CholloFacadeHttp } from '../../facadesHttp/CholloFacadeHttp';
import { EmpresaPatrocinadaFacadeHttp } from '../../facadesHttp/EmpresaPatrocinadaFacadeHttp';
import { CategoriaFacadeHttp } from '../../facadesHttp/CategoriaFacadeHttp';

@Component({
  selector: 'page-newSale',
  templateUrl: 'newSale.html'
})
export class newSalePage {
   
  idChollo:Number;
  chollo:Chollo;
  empresasPatrocinadas:EmpresaPatrocinada[];
  categorias:Categoria[];
  usuario:Usuario;
  empresaPatrocinadaActual:Number;
  categoriaActual:Number;
  dataIsCorrect:Boolean;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private cholloFacade: CholloFacadeHttp,
              private empresaPatrocinadaFacade: EmpresaPatrocinadaFacadeHttp,
              private categoriaFacade: CategoriaFacadeHttp,
              private userService: UserService) {

    this.idChollo =  navParams.get("idChollo");
    this.usuario = this.userService.getUser();
    this.dataIsCorrect = true;
    this.loadCompanies();
    this.loadCategories();
    if(this.idChollo == undefined) return;
    this.loadSaveInfo();

  }
  
  goToNewSale(params){
    if (!params) params = {};
    this.navCtrl.push(newSalePage);
  }
  
  goToDetails(params){
    if (!params) params = {};
    this.navCtrl.push(DetailsPage);
  }

  goToHome(){
    this.navCtrl.push(TabsControllerPage);
  }

  loadSaveInfo() {
    this.cholloFacade.find(this.navParams.get("idChollo")).subscribe(res=>{
      var chollo = res.json();    
      this.chollo = new Chollo(
            chollo.titulo,
            chollo.enlace,
            chollo.descripcion,
            chollo.precioAntes,
            chollo.precioDespues,
            chollo.fechaCreacion,
            chollo.fechaActualizacion,
            chollo.empresaNoPatrocinada,
            new EmpresaPatrocinada(chollo.empresaPatrocinada.nombre,chollo.empresaPatrocinada.id),
            new Usuario(chollo.usuario.alias,chollo.usuario.telefono,chollo.usuario.administrador,chollo.usuario.id),
            new Categoria(chollo.categoria.nombre,chollo.categoria.id),
            chollo.id
        );

        this.empresaPatrocinadaActual = this.usuario.getAdministrador() ? this.chollo.getEmpresaPatrocinada().getId() : -1;
        this.categoriaActual = this.chollo.getCategoria().getId();
    });
  }

  loadCompanies() {
    this.empresasPatrocinadas = [];
    this.empresaPatrocinadaFacade.findAll().subscribe(res=>{
      var data = res.json();
      data.forEach(empresa => {
        this.empresasPatrocinadas.push(new EmpresaPatrocinada(empresa.nombre,empresa.id))
      });
    });
  }

  loadCategories() {
    this.categorias = [];
    this.categoriaFacade.findAll().subscribe(res=>{
      var data = res.json();
      data.forEach(categoria => {
        this.categorias.push(new Categoria(categoria.nombre,categoria.id))
      });
    });
  }

  deleteSave(){
    this.cholloFacade.remove(this.chollo).subscribe(res => {
      this.goToHome();
    });
  }

  editSave(titulo:String, enlace:String, descripcion:String, precioAntes:string, precioDespues:string, empresaNoPatrocinada:String, empresaPatrocinada:string, categoria:string) {
    if(!this.formIsCorrect(titulo, enlace, descripcion, precioAntes, precioDespues, empresaNoPatrocinada, empresaPatrocinada, categoria)) return;
    this.chollo.setTitulo(titulo);
    this.chollo.setEnlace(enlace);
    this.chollo.setDescripcion(descripcion);
    this.chollo.setPrecioAntes(Number(precioAntes));
    this.chollo.setPrecioDespues(Number(precioDespues));
    this.chollo.setFechaActualizacion(new Date());
    this.chollo.setEmpresaNoPatrocinada(empresaNoPatrocinada);
    this.chollo.setEmpresaPatrocinada(
      this.usuario.getAdministrador() ? this.findCompanyInSelect(Number(empresaPatrocinada)) : this.findCompanyInSelect(-1),
    );
    this.chollo.setCategoria(this.findCategoryInSelect(Number(categoria)));
    
    this.cholloFacade.edit(this.chollo).subscribe(res => {
      this.goToHome();
    });
  }

  createSave(titulo:String, enlace:String, descripcion:String, precioAntes:string, precioDespues:string, empresaNoPatrocinada:String, empresaPatrocinada:string, categoria:string) {
    if(!this.formIsCorrect(titulo, enlace, descripcion, precioAntes, precioDespues, empresaNoPatrocinada, empresaPatrocinada, categoria)) return;
    var newSave = new Chollo
    (
      titulo,
      enlace, 
      descripcion, 
      Number(precioAntes),
      Number(precioDespues),
      new Date(),
      new Date(), 
      empresaNoPatrocinada, 
      this.usuario.getAdministrador() ? this.findCompanyInSelect(Number(empresaPatrocinada)) : this.findCompanyInSelect(-1),
      this.usuario, 
      this.findCategoryInSelect(Number(categoria))
    );

    this.cholloFacade.create(newSave).subscribe(res =>{
      this.goToHome();
    });
  }

  findCompanyInSelect(id:Number){
    return this.empresasPatrocinadas.find(empresaPatrocinada => empresaPatrocinada.getId() == id)
  }

  findCategoryInSelect(id:Number){
    return this.categorias.find(categoria => categoria.getId() == id);
  }

  formIsCorrect(titulo:String, enlace:String, descripcion:String, precioAntes:string, precioDespues:string, empresaNoPatrocinada:String, empresaPatrocinada:string, categoria:string){
    this.dataIsCorrect = 
      (titulo.trim().length > 0) &&
      (enlace.trim().length > 0) &&
      (descripcion.trim().length > 0) &&
      (!isNaN(parseFloat(precioAntes))) &&
      (!isNaN(parseFloat(precioDespues))) &&
      (this.usuario.getAdministrador() || (!this.usuario.getAdministrador() && empresaNoPatrocinada.trim().length > 0)) &&
      (!this.usuario.getAdministrador() || (this.usuario.getAdministrador() && (!isNaN(parseFloat(empresaPatrocinada))))) &&
      (!isNaN(parseFloat(categoria)));
    return this.dataIsCorrect;
  }
}
