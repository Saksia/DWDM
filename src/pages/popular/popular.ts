import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DetailsPage } from '../details/details';
import { Chollo } from '../../entities/Chollo';
import { CategoryService } from '../../services/CategoryService';
import { newSalePage } from '../newSale/newSale';
import { CholloFacadeHttp } from '../../facadesHttp/CholloFacadeHttp';
import { EmpresaPatrocinada } from '../../entities/EmpresaPatrocinada';
import { Usuario } from '../../entities/Usuario';
import { Categoria } from '../../entities/Categoria';

@Component({
  selector: 'page-popular',
  templateUrl: 'popular.html'
})
export class PopularPage {

  chollos:Chollo[];

  constructor(public navCtrl: NavController,
              private cholloFacade: CholloFacadeHttp,
              private categoryService: CategoryService) {
  }
  
  ionViewWillEnter() {
    this.resetCategoriesClasses();
    this.getPopulars();
    this.categoryService.setCategoryId(-1);
  }

  resetCategoriesClasses(){
    var categories = document.getElementById("categoryList").children;
    for (var i = 0; i < categories.length; i++) categories[i].classList.remove("activeCategory");
    categories[0].classList.add("activeCategory")
  }

  goToDetails(idChollo){
    this.navCtrl.push(DetailsPage, {idChollo: idChollo});
  }

  getPopulars(){
    this.chollos = [];
    this.cholloFacade.findPopulars().subscribe(res=>{
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

  goToNewSale(){
    this.navCtrl.push(newSalePage); 
  }

}
