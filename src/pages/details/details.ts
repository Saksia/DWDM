import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Chollo } from '../../entities/Chollo';
import { NavParams } from 'ionic-angular/navigation/nav-params';
import { UsuarioFacade } from '../../facades/UsuarioFacade';
import { newSalePage } from '../newSale/newSale';
import { Usuario } from '../../entities/Usuario';
import { Favorito } from '../../entities/Favorito';
import { Reaccion } from '../../entities/Reaccion';
import { UserService } from '../../services/UserService';
import { CholloFacadeHttp } from '../../facadesHttp/CholloFacadeHttp';
import { EmpresaPatrocinada } from '../../entities/EmpresaPatrocinada';
import { Categoria } from '../../entities/Categoria';
import { FavoritoFacadeHttp } from '../../facadesHttp/FavoritoFacadeHttp';
import { ReaccionFacadeHttp } from '../../facadesHttp/ReaccionFacadeHttp';

@Component({
  selector: 'page-details',
  templateUrl: 'details.html'
})
export class DetailsPage {
  
  chollos:Chollo[] = [];
  usuario:Usuario;
  favorito:Boolean;
  titulo:String;
  esMio:Boolean;
  liked:Boolean;
  disliked:Boolean;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private cholloFacade: CholloFacadeHttp,
              private usuarioFacade: UsuarioFacade,
              private favoritoFacade: FavoritoFacadeHttp,
              private reaccionFacade: ReaccionFacadeHttp,
              private userService: UserService) {
    this.usuario = this.userService.getUser();
    this.getChollo();
  }

  getChollo(){
    this.chollos = [];
    this.cholloFacade.find(this.navParams.get("idChollo")).subscribe(res=>{
      var chollo = res.json();    
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
        ); 
        this.titulo = chollo.titulo;
        this.esMio = this.chollos[0].getUsuario().getId() == this.usuario.getId();
        this.getFavorito();
        this.getLiked();
        this.getDisliked();
    });
  }

  goToNewSale(){
    this.navCtrl.push(newSalePage, {idChollo: this.chollos[0]});
  }

  getFavorito() {
    this.favoritoFacade.find(new Favorito(this.chollos[0], this.usuario)).subscribe(res=>{
      var favorito = res.json();
      this.favorito = favorito != null;
    });
  }

  addToFavourites(){
    this.favoritoFacade.create(new Favorito(this.chollos[0], this.usuario)).subscribe(res=>{
      this.favorito = true;
    });
    
  }

  deleteFromFavourites(){
    this.favoritoFacade.remove(new Favorito(this.chollos[0], this.usuario)).subscribe(res=>{
      this.favorito = false;
    });
  }

  getLiked(){
    this.reaccionFacade.findByPositiva(new Reaccion (this.chollos[0], this.userService.getUser(), true)).subscribe(res =>{
      this.liked = res.json() !== null;
      alert(res);
    });
  }

  getDisliked(){
    this.reaccionFacade.findByPositiva(new Reaccion (this.chollos[0], this.userService.getUser(), false)).subscribe(res =>{
      this.disliked = res.json() !== null;
    });
  }

  // addLikeTo(cholloId:String){
  //   var chollo = (this.cholloFacade.find(Number(cholloId)));
  //   var reaccion = new Reaccion(chollo, this.userService.getUser(), true);
  //   if(this.reaccionFacade.find(reaccion) != null && this.reaccionFacade.find(reaccion).getPositiva()) { this.reaccionFacade.remove(reaccion); return; } 
  //   this.reaccionFacade.remove(reaccion);
  //   this.reaccionFacade.create(reaccion);
  // }

  // addDislikeTo(cholloId:String){
  //   var chollo = (this.cholloFacade.find(Number(cholloId)));
  //   var reaccion = new Reaccion(chollo, this.userService.getUser(), false);
  //   if(this.reaccionFacade.find(reaccion) != null && !this.reaccionFacade.find(reaccion).getPositiva()) { this.reaccionFacade.remove(reaccion); return; } 
  //   this.reaccionFacade.remove(reaccion);
  //   this.reaccionFacade.create(reaccion);
  // }

  getColorForSave(chollo:Chollo, positiva:Boolean){
    return this.reaccionFacade.findByPositiva(new Reaccion (chollo, this.userService.getUser(), positiva)) == null? 'dark' : 'positive';
  }
  
}
