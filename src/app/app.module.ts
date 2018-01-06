import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { PopularPage } from '../pages/popular/popular';
import { TabsControllerPage } from '../pages/tabs-controller/tabs-controller';
import { DetailsPage } from '../pages/details/details';
import { newSalePage } from '../pages/newSale/newSale';
import { myProfilePage } from '../pages/myProfile/myProfile';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { FavoritoFacade } from '../facades/FavoritoFacade';
import { ReaccionFacade } from '../facades/ReaccionFacade';
import { UsuarioFacade } from '../facades/UsuarioFacade';
import { CategoriaFacade } from '../facades/CategoriaFacade';
import { CholloFacade } from '../facades/CholloFacade';
import { EmpresaPatrocinadaFacade } from '../facades/EmpresaPatrocinadaFacade';
import { FavoritoFacadeHttp } from '../facadesHttp/FavoritoFacadeHttp';
import { ReaccionFacadeHttp } from '../facadesHttp/ReaccionFacadeHttp';
import { UsuarioFacadeHttp } from '../facadesHttp/UsuarioFacadeHttp';
import { CategoriaFacadeHttp } from '../facadesHttp/CategoriaFacadeHttp';
import { CholloFacadeHttp } from '../facadesHttp/CholloFacadeHttp';
import { EmpresaPatrocinadaFacadeHttp } from '../facadesHttp/EmpresaPatrocinadaFacadeHttp';
import { CategoryService } from '../services/CategoryService';
import { UserService } from '../services/UserService';
import {AutoHideDirective} from '../directives/auto-hide/auto-hide';
import {HideHeaderDirective} from '../directives/hide-header/hide-header';
import { AppService } from '../services/AppService';
import { HttpModule } from '@angular/http';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    PopularPage,
    TabsControllerPage,
    DetailsPage,
    newSalePage,
    myProfilePage,
    LoginPage,
    SignupPage,
    AutoHideDirective,
    HideHeaderDirective
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    PopularPage,
    TabsControllerPage,
    DetailsPage,
    newSalePage,
    myProfilePage,
    LoginPage,
    SignupPage
  ],
  providers: [
    AppService,
    UserService,
    CategoryService,
    FavoritoFacade,
    ReaccionFacade,
    UsuarioFacade,
    CategoriaFacade,
    CholloFacade,
    EmpresaPatrocinadaFacade,
    FavoritoFacadeHttp,
    ReaccionFacadeHttp,
    UsuarioFacadeHttp,
    CategoriaFacadeHttp,
    CholloFacadeHttp,
    EmpresaPatrocinadaFacadeHttp,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
