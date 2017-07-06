import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DataService } from '../../services/data-service/dataService';
import { Device } from '@ionic-native/device';
import 'rxjs/add/operator/toPromise';
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  temp: number = 10;
  connected: boolean = false;
  data: string;

  constructor(
    public navCtrl: NavController,
    private dataService: DataService,
    private device: Device,
    private alertCtrl: AlertController) {
  }

  public sendData() {
    if (this.dataService.selectedDevice) {
      this.dataService.sendData({ deviceId: this.device.uuid, temp: this.temp }).toPromise().then((response) => {
        alert(`Success: ${JSON.stringify(response)}`);
      }, (err) => {
        alert(`Error: ${err}`)
      });
    } else { this.presentAlert(); }
  }

  private presentAlert() {
    let alert = this.alertCtrl.create({
      title: 'Wow!',
      subTitle: 'No device selected',
      buttons: ['ok']
    });
    alert.present();
  }

}
