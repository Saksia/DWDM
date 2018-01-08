import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NavParams } from 'ionic-angular/navigation/nav-params';
import { TabsControllerPage } from '../tabs-controller/tabs-controller';
import { UserService } from '../../services/UserService';
import { Usuario } from '../../entities/Usuario';
import { UsuarioFacadeHttp } from '../../facadesHttp/UsuarioFacadeHttp';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {

  dataIsCorrect: Boolean; 
  aliasNotAvailable: Boolean;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private usuarioFacade: UsuarioFacadeHttp,
              private userService: UserService) {
    this.dataIsCorrect = true;
    this.aliasNotAvailable = false;
  }

  goToHome(){
    this.navCtrl.push(TabsControllerPage);
  }
  
  checkAlias(alias: string){
    if(!this.formIsCorrect(alias)) return;
    this.usuarioFacade.findByAlias(alias).subscribe(res => {
      res.json() !== null ? this.aliasNotAvailable = true : this.createUser(alias);
    });
  }

  createUser(alias:String){
    this.usuarioFacade.create(new Usuario(alias, this.navParams.get("telefono"), false)).subscribe(res => {
      var data = res.json();
      this.userService.setUser(new Usuario(data.alias,data.telefono,data.administrador,data.id));
      this.goToHome();
    });
  }

  formIsCorrect(alias: string){
    this.dataIsCorrect = alias.trim().length > 0;
    return this.dataIsCorrect;
  }

}
