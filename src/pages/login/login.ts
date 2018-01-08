import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SignupPage } from '../signup/signup';
import { UserService } from '../../services/UserService';
import { Usuario } from '../../entities/Usuario';
import { TabsControllerPage } from '../tabs-controller/tabs-controller';
import { UsuarioFacadeHttp } from '../../facadesHttp/UsuarioFacadeHttp';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  
  dataIsCorrect: Boolean;

  constructor(public navCtrl: NavController,
              private usuarioFacade: UsuarioFacadeHttp,
              private userService: UserService) {
    this.dataIsCorrect = true;
  }

  goToHome(){
    this.navCtrl.push(TabsControllerPage, {});
  }
   
  goToSignup(telefono: String){
    this.navCtrl.push(SignupPage, {telefono: telefono});
  }

  checkTelephone(telefono: string){
    if(!this.formIsCorrect(telefono)) return;
    this.usuarioFacade.findByTelephone(telefono).subscribe(res =>{
      var data = res.json();
      if(data !== null) this.userService.setUser(new Usuario(data.alias,data.telefono,data.administrador,data.id));
      this.userService.getUser() == null ? this.goToSignup(telefono) : this.goToHome();
    });
  }

  formIsCorrect(telefono: string){
    this.dataIsCorrect = !isNaN(parseFloat(telefono));
    return this.dataIsCorrect;
  }
}
