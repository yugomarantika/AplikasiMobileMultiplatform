import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login'; 

import { DatabaseProvider } from '../providers/database/database'

declare var FCMPlugin;
 
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = LoginPage;

  constructor(private platform: Platform, private statusBar: StatusBar, splashScreen: SplashScreen, private databaseProvider: DatabaseProvider) {
    this.initialieApp();
    this.databaseProvider.createDatabase();
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();

      FCMPlugin.onTokenRefresh(function(token) {

      });
      
      FCMPlugin.getToken(function(token) {

      });

      FCMPlugin.subscribeToTopic('promosi');
      FCMPlugin.onNotification(function (data) {
        if(data.wasTapped) {
          alert(JSON.stringify(data));
        } else{
          alert(JSON.stringify(data));
        }});

        FCMPlugin.createNotificationChannelAndroid({
          id:"urgent_alert",
          name:"Urgent Alert",
          description:"Very urgent message alert",
          importance:"high",
          visibility:"public",
          sound:"alert_sound",
          lights:true,
          vibration:true
        });
    });
  }

  initialieApp() {
    this.statusBar.overlaysWebView(true);
    if(this.platform.is('android')) {
      this.statusBar.backgroundColorByHexString("#33000000");
    }
  }
}

