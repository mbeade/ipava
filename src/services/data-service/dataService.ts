import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class DataService {

  public showList: boolean = false;
  public selectedDevice;
  public deviceServiceInfoList = [];
  private readonly ORDER_API_ENDPOINT: string = '/api/beginrequest';
  private readonly STATUS_API_ENDPOINT: string = '/api/status';

  constructor(private http: Http) {
  }

  public start(clientInformation) {
    const endpointUrl = `${this.getBaseUrl()}${this.ORDER_API_ENDPOINT}`
    console.log('Calling: ' + endpointUrl + ' width: ' + JSON.stringify(clientInformation));
    return this.http.get(`${endpointUrl}/${clientInformation.temperature}`)
      .map(response => { return response.json() });
  }

  public status() {
    console.log('Calling:' + `${this.getBaseUrl()}${this.STATUS_API_ENDPOINT}`);
    return this.http.get(`${this.getBaseUrl()}${this.STATUS_API_ENDPOINT}`);
  }


  public addDevice(deviceName, ipAddress) {
    let alreadyInList = false;
    for (let s of this.deviceServiceInfoList) {
      if (s.name === deviceName) {
        alreadyInList = true;
        break;
      }
    }
    if (!alreadyInList) {
      this.deviceServiceInfoList.push(
        {
          name: deviceName,
          ipAddress: ipAddress
        });
    }
  }


  private getBaseUrl() {
    //return `http://${this.selectedDevice.ipAddress}`;
    return `http://192.168.40.30:3000`;

  }



}
