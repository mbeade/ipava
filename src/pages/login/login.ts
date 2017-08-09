import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { Zeroconf } from '@ionic-native/zeroconf';
import { DataService } from '../../services/data-service/dataService';
import { HomePage } from '../home/home';
import "rxjs/add/operator/timeout";

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  /* tslint:disable:no-unused-variable */
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

  startConnect(event) {

    this.loader = this.loadingCtrl.create({
      content: "Looking for devices"
    });
    this.loader.present();


    const zeroconfObsevable = this.zeroconf.watch(this.SERVICE_TYPE, this.SERVICE_DOMAIN)
      //.timeout(5000)
      .subscribe(result => {
        if (result.action == 'added') {
          let alreadyInList = false;
          for (let s of this.dataService.deviceServiceInfoList) {
            if (s.name === result.service.name) {
              alreadyInList = true;
              break;
            }
          }
          if (!alreadyInList) {
            this.dataService.deviceServiceInfoList.push(
              {
                name: result.service.name,
                ipAddress: result.service.ipv4Addresses[0]
              });
          }
        }
        this.loader.dismiss();
      }, e => {
        this.loader.dismiss();
        zeroconfObsevable.unsubscribe();
        this.dataService.deviceServiceInfoList = [];
        this.presentToast();
      });
  }

  itemSelected(deviceitem) {
    this.dataService.selectedDevice = deviceitem;
    this.navCtrl.setRoot(HomePage);
  }

  presentToast() {
    const toast = this.toastCtrl.create({
      message: 'Could not find any device.',
      duration: 5000,
      position: 'middle',
      showCloseButton: true,
      closeButtonText: 'Undo'
    });
    toast.present();
  }

}
