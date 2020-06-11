import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Profile } from '../../models/profil/profil-model'

@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
})
export class AboutPage {

  model: Profile;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    var recvData = this.navParams.get('profil');
    console.log(recvData);
    if(recvData.name){
      this.model = new Profile();
      this.model.name = recvData.name;
      this.model.updated_time = recvData.updated_time.toLocaleString();
      this.model.quote = recvData.quote;
      this.model.like = recvData.like;
      this.model.comments = recvData.comments;
      this.model.last_active = recvData.last_active;
    }
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AboutPage');
  }

}
