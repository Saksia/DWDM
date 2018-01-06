import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DetailsPage } from '../details/details';
import { CholloFacade } from '../../facades/CholloFacade';
import { Chollo } from '../../entities/Chollo';
import { ReaccionFacade } from '../../facades/ReaccionFacade';
import { Reaccion } from '../../entities/Reaccion';
import { newSalePage } from '../newSale/newSale';
import { Categoria } from '../../entities/Categoria';
import { CategoriaFacade } from '../../facades/CategoriaFacade';
import { CategoryService } from '../../services/CategoryService';
import { UserService } from '../../services/UserService';
import { UsuarioFacade } from '../../facades/UsuarioFacade';

@Component({
  selector: 'page-Home',
  templateUrl: 'Home.html'
})
export class HomePage {

  chollos:Chollo[];
  categorias:Categoria[];

  constructor(public navCtrl: NavController,
              private cholloFacade: CholloFacade,
              private categoriaFacade: CategoriaFacade,
              private reaccionFacade: ReaccionFacade,
              private categoryService: CategoryService,
              private userService: UserService,
              private usuarioFacade: UsuarioFacade) {
    this.loadCategories();
  }

  ionViewWillEnter() {
    this.getChollos();
    this.categoryService.setCategoryId(-1);
  }

  goToDetails(idChollo){
    this.navCtrl.push(DetailsPage, {idChollo: idChollo});
  }

  goToNewSale(){
    this.navCtrl.push(newSalePage);
  }

  getChollos(){
    this.chollos = this.cholloFacade.findAll();
  }

  addLikeTo(cholloId:String){
    var chollo = (this.cholloFacade.find(Number(cholloId)));
    var reaccion = new Reaccion(chollo, this.userService.getUser(), true);
    if(this.reaccionFacade.find(reaccion) != null && this.reaccionFacade.find(reaccion).getPositiva()) { this.reaccionFacade.remove(reaccion); return; } 
    this.reaccionFacade.remove(reaccion);
    this.reaccionFacade.create(reaccion);
  }

  addDislikeTo(cholloId:String){
    var chollo = (this.cholloFacade.find(Number(cholloId)));
    var reaccion = new Reaccion(chollo, this.userService.getUser(), false);
    if(this.reaccionFacade.find(reaccion) != null && !this.reaccionFacade.find(reaccion).getPositiva()) { this.reaccionFacade.remove(reaccion); return; } 
    this.reaccionFacade.remove(reaccion);
    this.reaccionFacade.create(reaccion);
  }

  loadCategories() {
    this.categorias = this.categoriaFacade.findAll();
  }

  filterSales(ev: any) {
    this.getChollos();
    let val = ev.target.value;
    if (val && val.trim() != '') {
      this.chollos = this.chollos.filter((chollo) => {
        return (chollo.getTitulo().toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  getColorForSave(chollo:Chollo, positiva:Boolean){
    return this.reaccionFacade.findByPositiva(new Reaccion (chollo, this.userService.getUser(), positiva)) == null? 'dark' : 'positive';
  }
}
