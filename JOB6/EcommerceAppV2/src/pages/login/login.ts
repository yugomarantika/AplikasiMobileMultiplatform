import { Component } from '@angular/core'; 
import { NavController, NavParams } from 'ionic-angular'; 
import { HomePage } from '../home/home'; 
import { AuthProvider } from '../../providers/auth/auth'; 
import { AlertProvider } from '../../providers/alert/alert'; 
import { RegisterPage } from '../register/register'; 
import { TabsPage } from '../tabs/tabs';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  user = {     
    'email': '',     
    'password': '',   
  }; 
 
  constructor(     
    public navCtrl: NavController,     
    private authProvider: AuthProvider,     
    private alertProvider: AlertProvider) 
    { } 

    login() { 
      this.authProvider.login(this.user).subscribe(       
        result => {         
          this.alertProvider.showToast("Berhasil Login");         
          this.navCtrl.setRoot(TabsPage);
        },       
        error => {         
        this.alertProvider.showToast("Username dan password salah!");       
      });   
    }

    showRegisterForm() {     
      this.navCtrl.push(RegisterPage); 
 
    } 
   
    ionViewDidLoad() { 
      let token = localStorage.getItem('user');     
      if (token != null) { 
        this.navCtrl.setRoot(TabsPage);  
      }   
    } 
  } 