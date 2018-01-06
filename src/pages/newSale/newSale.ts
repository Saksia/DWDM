import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DetailsPage } from '../details/details';
import { NavParams } from 'ionic-angular/navigation/nav-params';
import { Chollo } from '../../entities/Chollo';
import { CholloFacade } from '../../facades/CholloFacade';
import { EmpresaPatrocinada } from '../../entities/EmpresaPatrocinada';
import { EmpresaPatrocinadaFacade } from '../../facades/EmpresaPatrocinadaFacade';
import { Usuario } from '../../entities/Usuario';
import { CategoriaFacade } from '../../facades/CategoriaFacade';
import { Categoria } from '../../entities/Categoria';
import { UserService } from '../../services/UserService';
import { TabsControllerPage } from '../tabs-controller/tabs-controller';

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
              private cholloFacade: CholloFacade,
              private empresaPatrocinadaFacade: EmpresaPatrocinadaFacade,
              private categoriaFacade: CategoriaFacade,
              private userService: UserService) {

    this.idChollo =  navParams.get("idChollo");
    this.usuario = this.userService.getUser();
    this.dataIsCorrect = true;
    this.loadCompanies();
    this.loadCategories();
    if(this.idChollo == undefined) return;
    this.loadSaveInfo();
    this.empresaPatrocinadaActual = this.usuario.getAdministrador()? this.chollo.getEmpresaPatrocinada().getId() : -1;
    this.categoriaActual = this.chollo.getCategoria().getId();
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
    this.chollo = this.cholloFacade.find(this.idChollo);
  }

  loadCompanies() {
    this.empresasPatrocinadas = this.empresaPatrocinadaFacade.findAll();
  }

  loadCategories() {
    this.categorias = this.categoriaFacade.findAll();
  }

  deleteSave(){
    this.cholloFacade.remove(this.chollo);
    this.goToHome();
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
      this.usuario.getAdministrador() ? this.empresaPatrocinadaFacade.find(Number(empresaPatrocinada)) : new EmpresaPatrocinada("-", -1)
    );
    this.chollo.setCategoria(this.categoriaFacade.find(Number(categoria)));
    this.cholloFacade.edit(this.chollo);
    this.goToHome();
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
      this.usuario.getAdministrador() ? this.empresaPatrocinadaFacade.find(Number(empresaPatrocinada)) : new EmpresaPatrocinada("-", -1),
      this.usuario, 
      this.categoriaFacade.find(Number(categoria)), 
      Math.trunc((Math.random() * 1000) + 4)
    )
    this.cholloFacade.create(newSave);
    this.goToHome();
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
