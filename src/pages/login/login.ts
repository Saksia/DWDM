import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SignupPage } from '../signup/signup';
import { UserService } from '../../services/UserService';
import { Usuario } from '../../entities/Usuario';
import { TabsControllerPage } from '../tabs-controller/tabs-controller';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  
  dataIsCorrect: Boolean;

  constructor(public navCtrl: NavController,
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
    var user:Usuario = this.userService.setUser(telefono);
    user == null ? this.goToSignup(telefono) : this.goToHome();
  }

  formIsCorrect(telefono: string){
    this.dataIsCorrect = !isNaN(parseFloat(telefono));
    return this.dataIsCorrect;
  }
}
