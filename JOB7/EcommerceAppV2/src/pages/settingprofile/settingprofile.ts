import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { AlertProvider } from '../../providers/alert/alert';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-settingprofile',
  templateUrl: 'settingprofile.html',
})
export class SettingprofilePage {

  user = {'name': '','email': ''}
  response: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private authProvider: AuthProvider,private alertProvider: AlertProvider) {
    var user = JSON.parse(localStorage.getItem('user'));
    this.user.name = user.name;
    this.user.email = user.email;
  }  

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingprofilePage');
  }

}
