import { Component } from '@angular/core';
import { NavController, Platform, ToastController } from 'ionic-angular';
import { UserAccount } from '../../models/user/user-model'; 
import { UserProvider } from '../../providers/user/user';
import { RegisterPage } from '../register/register'; 
import { MenuPage } from '../menu/menu';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  userAccounts: UserAccount[]= [];
  newUser: UserAccount = <UserAccount>{};

  constructor(private navCtrl: NavController, private userProvider: UserProvider, private platform: Platform, private toastController: ToastController) {
    this.platform.ready().then(() => {

    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  checkLoginAccount(){
    if(!this.newUser.username || !this.newUser.password){
      this.showToast("Please Fill Completely Username And Password!");
      return null;
    }

    this.userProvider.validateUserAccount(this.newUser.username, this.newUser.password).then(userAccount => {
      if(userAccount != null){
        this.showToast("Login Success!");
        this.navCtrl.setRoot(MenuPage, {account: userAccount}); 
      }
      else
      {
        this.showToast("Username And Password Not Available, Please Sign Up!");
      }
    });
  }

  openRegisterForm(){
    this.navCtrl.push(RegisterPage);
  }

  async showToast(msg){
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

}
