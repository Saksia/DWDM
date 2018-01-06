import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NavParams } from 'ionic-angular/navigation/nav-params';
import { TabsControllerPage } from '../tabs-controller/tabs-controller';
import { UserService } from '../../services/UserService';
import { Usuario } from '../../entities/Usuario';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {

  dataIsCorrect: Boolean; 
  aliasNotAvailable: Boolean;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private userService: UserService) {
    this.dataIsCorrect = true;
    this.aliasNotAvailable = false;
  }

  goToHome(){
    this.navCtrl.push(TabsControllerPage);
  }
  
  checkAlias(alias: string){
    if(!this.formIsCorrect(alias)) return;
    var user:Usuario = this.userService.createUser(this.navParams.get("telefono"), alias);
    user == null ? this.aliasNotAvailable = true : this.goToHome();
  }

  formIsCorrect(alias: string){
    this.dataIsCorrect = alias.trim().length > 0;
    return this.dataIsCorrect;
  }

}
