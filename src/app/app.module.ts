import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ConnectionPageModule } from '../pages/connection/connection.module';
import { DataService } from '../services/data-service/dataService';
import { HttpModule } from '@angular/http';
import { LoginPageModule } from '../pages/login/login.module';

import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Zeroconf } from '@ionic-native/zeroconf';
import { Device } from '@ionic-native/device';
import { SettingsPageModule } from '../pages/settings/settings.module';

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    ConnectionPageModule,
    HttpModule,
    LoginPageModule,
    SettingsPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    DataService,
    Zeroconf,
    Device
  ]
})
export class AppModule { }
