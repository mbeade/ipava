import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { DataService } from '../../services/data-service/dataService';
import { Slides } from 'ionic-angular';
import { Zeroconf } from '@ionic-native/zeroconf';
import { Device } from '@ionic-native/device';
import 'rxjs/add/operator/toPromise';

@IonicPage()
@Component({
  selector: 'page-connection',
  templateUrl: 'connection.html',
})
export class ConnectionPage {

  @ViewChild(Slides) slides: Slides;
  temp: number = 30;
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
    private toastCtrl: ToastController,
    private device: Device, 
  ) {
  }

  public isBtnStartEnabled(): boolean {
    return this.dataService.selectedDevice;
  }

  public start() {
    this.dataService.start({ deviceId: this.device.uuid, temperature: this.temp })
      .subscribe(jsonResponse => {
        this.presentToast(jsonResponse.msg);
        this.slides.slideTo(3);
      });
  }

  public searchDevices(event) {

    this.loader = this.loadingCtrl.create({
      content: "Buscando"
    });
    this.loader.present();

    const zeroconfObsevable = this.zeroconf.watch(this.SERVICE_TYPE, this.SERVICE_DOMAIN)
      .subscribe(result => {
        if (result.action == 'added') {
          this.dataService.addDevice(result.service.name, result.service.ipv4Addresses[0]);
          this.loader.dismiss();
        }
      }, e => {
        zeroconfObsevable.unsubscribe();
        this.dataService.deviceServiceInfoList = [];
        this.presentToast('Ocurrio un error');
        this.loader.dismiss();
      });
  }

  public selectDevice(deviceitem) {
    this.dataService.selectedDevice = deviceitem;
  }

  public isSelected(deviceName) {
    return this.dataService.selectedDevice.name === deviceName;
  }

  public registerTestingService() {
    this.zeroconf.register('_http._tcp.', 'local.', 'Becvert\'s iPad', 80, {
      'foo': 'bar'
    }).then(result => {
      alert('Service registered');
    });
  }

  private sendData() {

  }

  private getStatus() {
    this.dataService.status().toPromise().then((response) => {
      alert(`Status: ${JSON.stringify(response.json())}`);
    }, (err) => {
      alert(`Error: ${err}`)
    });
  }

  private presentToast(msg) {
    const toast = this.toastCtrl.create({
      message: msg,
      duration: 5000,
      position: 'middle',
      showCloseButton: true,
      closeButtonText: 'X'
    });
    toast.present();
  }
}
