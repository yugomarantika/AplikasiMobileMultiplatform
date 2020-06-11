import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import{ ProductfavoriteProvider} from'../../providers/productfavorite/productfavorite';
import{ AlertProvider} from'../../providers/alert/alert';

@Component({
  selector: 'page-myfavorite',
  templateUrl: 'myfavorite.html',
})
export class MyfavoritePage {

  products: any[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private productfavoriteProvider: ProductfavoriteProvider, private alertProvider: AlertProvider) {
    this.getAllFavorite();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyfavoritePage');
    this.getAllFavorite();
  }

  getAllFavorite(){
    this.productfavoriteProvider.getAll().then(
      (result:any[]) =>{
        this.products= result;
      },
      error=>{console.log("errornya: "+error);
    })
  }

  remove(id:number){
    this.productfavoriteProvider.remove(id).then(
      result=>{this.alertProvider.showToast(result);
        this.getAllFavorite();
      },
      error=>{this.alertProvider.showToast(error);
      })
    }

}
