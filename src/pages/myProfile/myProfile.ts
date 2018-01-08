import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PopularPage } from '../popular/popular';
import { DetailsPage } from '../details/details';
import { Usuario } from '../../entities/Usuario';
import { Chollo } from '../../entities/Chollo';
import { UserService } from '../../services/UserService';
import { newSalePage } from '../newSale/newSale';
import { UsuarioFacadeHttp } from '../../facadesHttp/UsuarioFacadeHttp';
import { CholloFacadeHttp } from '../../facadesHttp/CholloFacadeHttp';
import { EmpresaPatrocinada } from '../../entities/EmpresaPatrocinada';
import { Categoria } from '../../entities/Categoria';

@Component({
  selector: 'page-myProfile',
  templateUrl: 'myProfile.html'
})
export class myProfilePage {

  usuario: Usuario;
  galleryType:String ='regular';
  chollos: Chollo[];
  favoritos: Chollo[];
  userLikes:number;
  userDislikes:number;

  constructor(public navCtrl: NavController,
              private cholloFacade: CholloFacadeHttp,
              private usuarioFacade: UsuarioFacadeHttp,
              private userService: UserService) {
    this.usuario = this.userService.getUser();
  }

  ionViewWillEnter() {
    this.getUserLikes();
    this.getUserDislikes();
    this.getChollos();
    this.getFavoritos();
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

  getChollos(){
    this.chollos = [];
    this.cholloFacade.findByUser(this.usuario).subscribe(res => {
      var data = res.json();
      data.forEach(chollo => {
        this.chollos.push(new Chollo(
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
          )
        )
      });
    });
  }

  getFavoritos(){
    this.favoritos = [];
    this.cholloFacade.findFavouritesByUser(this.usuario).subscribe(res => {
      var data = res.json();
      data.forEach(chollo => {
        this.favoritos.push(new Chollo(
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
          )
        )
      });
    });
  }

  getUserLikes(){
    this.usuarioFacade.getLikesOf(this.usuario).subscribe(res => {
        this.userLikes = res.json();
    });
  }

  getUserDislikes(){
    this.usuarioFacade.getDislikesOf(this.usuario).subscribe(res => {
      this.userDislikes = res.json();
  });
  }
}
