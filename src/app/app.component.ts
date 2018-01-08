import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TabsControllerPage } from '../pages/tabs-controller/tabs-controller';
import { Categoria } from '../entities/Categoria';
import { NavController } from 'ionic-angular/navigation/nav-controller';
import { ViewChild } from '@angular/core';
import { CategoryService } from '../services/CategoryService';
import { LoginPage } from '../pages/login/login';
import { UserService } from '../services/UserService';
import { CategoriaFacadeHttp } from '../facadesHttp/CategoriaFacadeHttp';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild('myNav')navCtrl: NavController;
  rootPage:any;
  categorias:Categoria[] = [];

  constructor(platform: Platform, 
              statusBar: StatusBar, 
              splashScreen: SplashScreen,
              private categoriaFacade: CategoriaFacadeHttp,
              private categoryService: CategoryService,
              private userService: UserService) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      this.rootPage = this.userService.getUser() == null ? LoginPage : TabsControllerPage;
      this.loadCategories();
    });
  }

  loadCategories() {
    this.categoriaFacade.findAll().subscribe(res=>{
      var data = res.json();
      data.forEach(categoria => {
        this.categorias.push(new Categoria(categoria.nombre,categoria.id))
      });
    });
  }

  refresh(categoriaId, event){
    var categories = document.getElementById("categoryList").children;
    for (var i = 0; i < categories.length; i++) categories[i].classList.remove("activeCategory");
    event.currentTarget.classList.add("activeCategory");
    this.categoryService.setCategoryId(categoriaId);
  }
  
}
