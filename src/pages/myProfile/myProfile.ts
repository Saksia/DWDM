import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PopularPage } from '../popular/popular';
import { DetailsPage } from '../details/details';
import { CholloFacade } from '../../facades/CholloFacade';
import { Usuario } from '../../entities/Usuario';
import { UsuarioFacade } from '../../facades/UsuarioFacade';
import { Chollo } from '../../entities/Chollo';
import { UserService } from '../../services/UserService';
import { newSalePage } from '../newSale/newSale';

@Component({
  selector: 'page-myProfile',
  templateUrl: 'myProfile.html'
})
export class myProfilePage {

  usuario: Usuario;
  galleryType:String ='regular';
  chollos: Chollo[];
  favoritos: Chollo[];

  constructor(public navCtrl: NavController,
              private cholloFacade: CholloFacade,
              private usuarioFacade: UsuarioFacade,
              private userService: UserService) {
    this.usuario = this.userService.getUser();
  }

  ionViewWillEnter() {
    this.chollos = this.cholloFacade.findByUser(this.usuario);
    this.favoritos = this.cholloFacade.findFavouritesByUser(this.usuario);
  }

  goToPopular(params){
    if (!params) params = {};
    this.navCtrl.push(PopularPage);

  }

  goToDetails(idChollo){
    this.navCtrl.push(DetailsPage, {idChollo: idChollo});
  }

  goToNewSale(){
    this.navCtrl.push(newSalePage); 
  }
}
