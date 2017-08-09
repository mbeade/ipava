import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { ZeroconfService } from '@ionic-native/zeroconf';

@Injectable()
export class DataService {

  public showList: boolean = false;
  public selectedDevice;
  public deviceServiceInfoList = [];
  private readonly ORDER_API_ENDPOINT: string = '/api/order';
  private readonly STATUS_API_ENDPOINT: string = '/api/status';

  constructor(private http: Http) {
  }

  public start(clientInformation) {
    const endpointUrl = `${this.getBaseUrl()}${this.ORDER_API_ENDPOINT}`
    alert('Calling: ' + endpointUrl + ' width: ' + JSON.stringify(clientInformation));
    return this.http.post(endpointUrl, clientInformation);
  }


  public status() {
    return this.http.get(`${this.getBaseUrl()}${this.STATUS_API_ENDPOINT}`);
     
  }


  private getBaseUrl() {
    return `http://${this.selectedDevice.ipAddress}`;
  }
}
