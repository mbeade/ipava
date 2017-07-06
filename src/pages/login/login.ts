import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { Zeroconf } from '@ionic-native/zeroconf';
import { DataService } from '../../services/data-service/dataService';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  private loader;
  private readonly SERVICE_TYPE: string = '_http._tcp.';
  private readonly SERVICE_DOMAIN: string = 'local.';
  private readonly SERVICE_NAME_PREFIX: string = 'iPava';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public dataService: DataService,
    private zeroconf: Zeroconf,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  startConnect(event) {

    this.loader = this.loadingCtrl.create({
      content: "Looking for devices"
    });
    this.loader.present();

    // watch for services of a specified type
    this.zeroconf.watch(this.SERVICE_TYPE, this.SERVICE_DOMAIN).subscribe(result => {
      if (result.service.name.indexOf(this.SERVICE_NAME_PREFIX) !== -1 && result.service.ipv4Addresses[0]) {
        let alreadyInList = false;
        this.dataService.deviceServiceInfoList.forEach(e => {
          if (e.name === result.service.name) {
            alreadyInList = true;
          }
        });
        if (!alreadyInList) {
          this.dataService.deviceServiceInfoList.push(result.service);
        }

        this.loader.dismiss();
      }
    }, e => {
      this.loader.dismiss();
      this.zeroconf.unwatch(this.SERVICE_TYPE, this.SERVICE_DOMAIN);
      this.dataService.deviceServiceInfoList = [];
      this.presentToast();
    });
  }

  itemSelected(deviceitem) {
    this.dataService.selectedDevice = deviceitem;
    this.navCtrl.setRoot(HomePage);
  }

  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Could not find any device.',
      duration: 5000,
      position: 'middle'
    });
    toast.present();
  }

}
