import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DetailsPage } from '../details/details';
import { Chollo } from '../../entities/Chollo';
import { CholloFacade } from '../../facades/CholloFacade';
import { CategoryService } from '../../services/CategoryService';
import { newSalePage } from '../newSale/newSale';

@Component({
  selector: 'page-popular',
  templateUrl: 'popular.html'
})
export class PopularPage {

  chollos:Chollo[];

  constructor(public navCtrl: NavController,
              private cholloFacade: CholloFacade,
              private categoryService: CategoryService) {
  }
  
  ionViewWillEnter() {
    this.getPopulars();
    this.categoryService.setCategoryId(-1);
  }

  goToDetails(idChollo){
    this.navCtrl.push(DetailsPage, {idChollo: idChollo});
  }

  getPopulars(){
    this.chollos = this.cholloFacade.findPopulars();
  }

  goToNewSale(){
    this.navCtrl.push(newSalePage); 
  }

}
