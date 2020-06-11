import { Component, ChangeDetectorRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';

import { AlertProvider } from '../../providers/alert/alert';
import { LoginPage } from '../login/login';
import { ProductProvider } from '../../providers/product/product';
import { ProductfavoriteProvider } from '../../providers/productfavorite/productfavorite';
import { MyfavoritePage } from '../myfavorite/myfavorite';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  user = {
    'name':'',
    'email':''
  }
  response: any;

  slider = [
    { imageUrl: '../../assets/imgs/masakan1_1.jpg' },
    { imageUrl: '../../assets/imgs/masakan2_2.jpg' },
    { imageUrl: '../../assets/imgs/masakan3_3.jpg' },
  ];

  category = [];
  products = [];
  page = 1;
  opacity:boolean = false;
  transition:boolean = false;
  iconColor:boolean = false;

  constructor(
    public navCtrl: NavController,
    private authProvider : AuthProvider,
    private alertProvider : AlertProvider,
    private productProvider : ProductProvider,
    private productfavoriteProvider : ProductfavoriteProvider,
    private myfavoritePage : MyfavoritePage,
    private ref: ChangeDetectorRef)
    {
      //mengambil data user dari local storage
      var user = JSON.parse(localStorage.getItem('user'));
      this.user.name = user.name;
      this.user.email = user.email;
      this.showCategory();
      this.showPublicProduct();
    }

    showCategory() {
      this.productProvider.getCategoryProduct().subscribe(
        result => {
          this.response = result;
          var data = this.response.data;
          data.forEach(element => {
            this.category.push(element)
          });
        }
      )
    }

    addToFavorite(id: number) {
      this.productfavoriteProvider.getById(this.products[id].id).then(result=>{if(result> 0) {
        this.alertProvider.showToast("Product sudah di favorite");
      }else{
        this.productfavoriteProvider.insert(this.products[id]).then(() =>{
          this.alertProvider.showToast("Product berhasil ditambahkan ke favorite");
            },
            error=>{this.alertProvider.showToast("Product gagal didtambahkan ke favorite");
            }
          )
        }
      },
    error=>{}
    )
  }

  openFavoritePage() {
    this.navCtrl.push(MyfavoritePage);
  }

    showProductByCategory(id) {
      this.alertProvider.showToast("Detail product kategori: " +id);
    }

    showPublicProduct() {
      this.productProvider.getAllPublicProduct(this.page).subscribe(
        response => {
          this.response = response;
          this.response.data.forEach(element => {
            if (element.active == "2")
            this.products.push(element);
          });
        });
    }

    loadMore(infiniteScroll) {
      this.page = this.page + 1;
      setTimeout(() => {
        this.productProvider.getAllPublicProduct(this.page).subscribe(
          response => {
            this.response = response;
            this.response.data.forEach(element => {
              if (element.active == "2")
              this.products.push(element);
            });
          });
          infiniteScroll.complete();
      }, 500);
    }

    onPageScroll($event:any){
      let scrollTop = $event.scrollTop;
      this.opacity = scrollTop >= 50;
      this.iconColor = scrollTop >= 50;
      if(scrollTop < 0){
        this.transition = false;
      }else{
        this.transition = true;
      }
      this.ref.detectChanges();
    }

    logout(){
      this.authProvider.logout().subscribe(
        result =>{
          this.response = result;
          this.alertProvider.showToast(this.response.message)
          this.navCtrl.push(LoginPage);
        }
      );
    }
  }