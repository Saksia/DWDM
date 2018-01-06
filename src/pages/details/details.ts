import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CholloFacade } from '../../facades/CholloFacade';
import { Chollo } from '../../entities/Chollo';
import { NavParams } from 'ionic-angular/navigation/nav-params';
import { UsuarioFacade } from '../../facades/UsuarioFacade';
import { newSalePage } from '../newSale/newSale';
import { Usuario } from '../../entities/Usuario';
import { FavoritoFacade } from '../../facades/FavoritoFacade';
import { Favorito } from '../../entities/Favorito';
import { ReaccionFacade } from '../../facades/ReaccionFacade';
import { Reaccion } from '../../entities/Reaccion';
import { UserService } from '../../services/UserService';

@Component({
  selector: 'page-details',
  templateUrl: 'details.html'
})
export class DetailsPage {
  
  chollo:Chollo;
  usuario:Usuario;
  favorito:Boolean;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private cholloFacade: CholloFacade,
              private usuarioFacade: UsuarioFacade,
              private favoritoFacade: FavoritoFacade,
              private reaccionFacade: ReaccionFacade,
              private userService: UserService) {
    this.chollo = this.cholloFacade.find(navParams.get("idChollo"));
    this.usuario = this.userService.getUser();
    this.favorito = this.getFavorito();
  }

  goToNewSale(idChollo){
    this.navCtrl.push(newSalePage, {idChollo: idChollo});
  }

  getFavorito() {
    return this.favoritoFacade.find(new Favorito(this.chollo, this.usuario)) != null;
  }

  addToFavourites(){
    this.favoritoFacade.create(new Favorito(this.chollo, this.usuario));
    this.favorito = true;
  }

  deleteFromFavourites(){
    this.favoritoFacade.remove(new Favorito(this.chollo, this.usuario));
    this.favorito = false;
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

  getColorForSave(chollo:Chollo, positiva:Boolean){
    return this.reaccionFacade.findByPositiva(new Reaccion (chollo, this.userService.getUser(), positiva)) == null? 'dark' : 'positive';
  }
  
}
