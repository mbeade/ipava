import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DataService } from '../../services/data-service/dataService';

@IonicPage()
@Component({
  selector: 'page-connection',
  templateUrl: 'connection.html',
})
export class ConnectionPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public dataService: DataService) {
  }


}
