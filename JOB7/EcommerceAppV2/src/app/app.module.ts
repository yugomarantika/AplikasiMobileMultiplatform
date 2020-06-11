import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import{ TabsPage} from'../pages/tabs/tabs';
import { MyproductPage } from '../pages/myproduct/myproduct';
import { FormproductPage } from '../pages/formproduct/formproduct';
import { CovidinfoPage } from '../pages/covidinfo/covidinfo';
import { MyprofilePage } from '../pages/myprofile/myprofile';
import { MyfavoritePage } from '../pages/myfavorite/myfavorite';
import { SQLite } from '@ionic-native/sqlite';
import{ Camera} from'@ionic-native/camera';
import{ FileTransfer, FileTransferObject} from'@ionic-native/file-transfer';
import{ File} from'@ionic-native/file';
import{ FilePath} from'@ionic-native/file-path';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AlertProvider } from '../providers/alert/alert';
import { EnvProvider } from '../providers/env/env';
import { AuthProvider } from '../providers/auth/auth';
import { RegisterPage } from '../pages/register/register'; 
import { LoginPage } from '../pages/login/login'; 
import { HttpClientModule } from '@angular/common/http';
import { ProductProvider } from '../providers/product/product';
import { CovidinfoProvider } from '../providers/covidinfo/covidinfo';
import { DatabaseProvider } from '../providers/database/database';
import { ProductfavoriteProvider } from '../providers/productfavorite/productfavorite'; 
import { SearchPage } from '../pages/search/search';
import { DetailproductPage } from '../pages/detailproduct/detailproduct';
import { SettingprofilePage } from '../pages/settingprofile/settingprofile';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    RegisterPage,     
    LoginPage,
    TabsPage,
    MyproductPage,
    FormproductPage,
    CovidinfoPage,
    MyprofilePage,
    MyfavoritePage,
    SearchPage,
    DetailproductPage,
    SettingprofilePage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    RegisterPage,     
    LoginPage,
    TabsPage,
    MyproductPage,
    FormproductPage,
    CovidinfoPage,
    MyprofilePage,
    MyfavoritePage,
    SearchPage,
    DetailproductPage,
    SettingprofilePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AlertProvider,
    EnvProvider,
    AuthProvider,
    ProductProvider,
    CovidinfoProvider,
    DatabaseProvider,
    ProductfavoriteProvider,
    SQLite,
    FileTransfer, 
    FileTransferObject,
    File,
    FilePath,
    Camera
  ]
})
export class AppModule {}
