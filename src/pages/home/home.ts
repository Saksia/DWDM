import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DetailsPage } from '../details/details';
import { Chollo } from '../../entities/Chollo';
// import { ReaccionFacade } from '../../facades/ReaccionFacade';
// import { Reaccion } from '../../entities/Reaccion';
import { newSalePage } from '../newSale/newSale';
import { Categoria } from '../../entities/Categoria';
import { CategoryService } from '../../services/CategoryService';
import { UserService } from '../../services/UserService';
import { CholloFacadeHttp } from '../../facadesHttp/CholloFacadeHttp';
import { Usuario } from '../../entities/Usuario';
import { EmpresaPatrocinada } from '../../entities/EmpresaPatrocinada';
import { CategoriaFacadeHttp } from '../../facadesHttp/CategoriaFacadeHttp';
import { UsuarioFacadeHttp } from '../../facadesHttp/UsuarioFacadeHttp';

@Component({
  selector: 'page-Home',
  templateUrl: 'Home.html'
})
export class HomePage {

  chollos:Chollo[] = [];
  categorias:Categoria[] = [];

  constructor(public navCtrl: NavController,
              private cholloFacade: CholloFacadeHttp,
              private categoriaFacade: CategoriaFacadeHttp,
              // private reaccionFacade: ReaccionFacade,
              private categoryService: CategoryService,
              private userService: UserService,
              private usuarioFacade: UsuarioFacadeHttp) {
  }

  ionViewWillEnter() {
    this.resetCategoriesClasses();
    this.getChollos();
    this.categoryService.setCategoryId(-1);
  }

  resetCategoriesClasses(){
    var categories = document.getElementById("categoryList").children;
    for (var i = 0; i < categories.length; i++) categories[i].classList.remove("activeCategory");
    categories[0].classList.add("activeCategory")
  }

  goToDetails(chollo:Chollo){
    this.navCtrl.push(DetailsPage, {idChollo: chollo.getId()});
  }

  goToNewSale(){
    this.navCtrl.push(newSalePage);
  }

  getChollos(){
    this.chollos = [];
    this.cholloFacade.findAll().subscribe(res=>{
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

  filterSales(ev: any) {
    let val = ev.target.value;
      this.chollos.forEach((chollo) => {
        chollo.visible = (val && val.trim() == '') || (chollo.getTitulo().toLowerCase().indexOf(val.toLowerCase())) > -1 ? true : false;
      })
  }

  // getUserLikes(usuario: Usuario){
  //   this.usuarioFacade.getLikesOf(usuario);
  // }

  // getUserDisLikes(usuario: Usuario){
  //   this.usuarioFacade.getLikesOf(usuario);
  // }

  // addLikeTo(cholloId:String){
  //     this.cholloFacade.find(Number(cholloId)).subscribe(res=>{
  //     var chollo; //chollo con la info de res.json()
  //     var reaccion = new Reaccion(chollo, this.userService.getUser(), true);
  //     if(this.reaccionFacade.find(reaccion) != null && this.reaccionFacade.find(reaccion).getPositiva()) { this.reaccionFacade.remove(reaccion); return; } 
  //     this.reaccionFacade.remove(reaccion);
  //     this.reaccionFacade.create(reaccion);
  //   });
  // }

  // addDislikeTo(cholloId:String){
  //   this.cholloFacade.find(Number(cholloId)).subscribe(res=>{
  //     var chollo; //chollo con la info de res.json()
  //     var reaccion = new Reaccion(chollo, this.userService.getUser(), false);
  //     if(this.reaccionFacade.find(reaccion) != null && !this.reaccionFacade.find(reaccion).getPositiva()) { this.reaccionFacade.remove(reaccion); return; } 
  //     this.reaccionFacade.remove(reaccion);
  //     this.reaccionFacade.create(reaccion);
  //   });
  // }

  // getColorForSave(chollo:Chollo, positiva:Boolean){
  //   return this.reaccionFacade.findByPositiva(new Reaccion (chollo, this.userService.getUser(), positiva)) == null? 'dark' : 'positive';
  // }
}
