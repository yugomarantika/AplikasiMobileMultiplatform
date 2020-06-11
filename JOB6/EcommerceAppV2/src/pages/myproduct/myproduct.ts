import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController, Events} from 'ionic-angular';
import { ProductProvider } from '../../providers/product/product';
import { AlertProvider } from '../../providers/alert/alert';
import { FormproductPage } from '../formproduct/formproduct';
import { DetailproductPage } from '../detailproduct/detailproduct';

@Component({
  selector: 'page-myproduct',
  templateUrl: 'myproduct.html',
})
export class MyproductPage {

  response:any;
  products =[];
  loader: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private productProvider: ProductProvider, private loadingCtrl: LoadingController, private alertCtrl: AlertController, private alertProvider : AlertProvider, private event: Events) { 
    this.presentLoading();
    this.showUserProduct();
    this.event.subscribe('save:success',()=>{
      this.showUserProduct();
    });
  }

  public showUserProduct() {
    this.productProvider.getAllUserProduct()
    .subscribe(response => {
      this.response = response;
      this.products = [];
      this.response.data.forEach(element => {
        this.products.push(element);
      });
      this.loader.dismiss();
    });
  }

  deleteUserProduct(id:number,name:string){
    this.productProvider.deleteProduct(id).subscribe(response => {
      this.alertProvider.showToast("Data masakan "+name+" berhasil dihapus");
      this.showUserProduct();},
      error => {this.alertProvider.showToast("Data masakan "+name+" gagal dihapus")
    });    
  }

  presentLoading() {
    this.loader = this.loadingCtrl.create({
      content: "Please wait..."});
      this.loader.present();
    }

    showConfirm(id,nama) {
      const confirm = this.alertCtrl.create({
        title: 'My Product',
        message: 'Yakin ingin menghapus '+nama+'?',
        buttons: [{text: 'Tidak',
        handler: () => {
          console.log('Disagree clicked');
        }},
        {text: 'Ya',handler: () => {
          console.log('Agree clicked');
          this.deleteUserProduct(id,nama);
        }
      }
    ]
  });
  confirm.present();
}

showInputForm(){
  this.navCtrl.push(FormproductPage);
}

showUpdateForm(id:number){
  this.navCtrl.push(FormproductPage, {id:id})
}

showDetailProduct(id){
  this.navCtrl.push(DetailproductPage, {id});
}


  ionViewDidLoad() {
    console.log('ionViewDidLoad MyproductPage');
  }

}
