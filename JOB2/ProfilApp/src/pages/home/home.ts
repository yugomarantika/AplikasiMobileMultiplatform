import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AboutPage } from '../about/about'; 
import { Profile } from '../../models/profil/profil-model';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private myProfil: Profile;
  private status: string;

  constructor(public navCtrl: NavController) {
    this.myProfil = new Profile();
  }
    
  openAboutPage(){ 
    this.myProfil.name = "Yugo Marantika";
    this.myProfil.updated_time = new Date(Date.now());
    this.myProfil.quote =  this.status; 
    this.myProfil.like = 0;
    this.myProfil.comments = 0;
    this.myProfil.last_active = 0;    
    this.navCtrl.push(AboutPage, {profil: this.myProfil}); 
  } 

}

