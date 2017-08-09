import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DataService } from '../../services/data-service/dataService';
import { Zeroconf } from '@ionic-native/zeroconf'

/**
 * Generated class for the SettingsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  ipAddress: string;
  port: number;
  stats: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public dataService: DataService,
    private zeroconf: Zeroconf) {
  }

  setConnectionData() {
    this.dataService.selectedDevice = {};
    this.dataService.selectedDevice.ipv4Addresses = [];
    this.dataService.selectedDevice.ipv4Addresses.push(this.ipAddress);
    this.dataService.selectedDevice.port = this.port;
    alert(JSON.stringify(this.dataService.selectedDevice));
  }

  registerTestingService() {
    // publish a zeroconf service of your own
    this.zeroconf.register('_http._tcp.', 'local.', 'Becvert\'s iPad', 80, {
      'foo': 'bar'
    }).then(result => {
      alert('Service registered');
    });
  }

}
