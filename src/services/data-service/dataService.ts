import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { ZeroconfService } from '@ionic-native/zeroconf';
// Import RxJs required methods
import 'rxjs/add/operator/map';

@Injectable()
export class DataService {

  showList: boolean = false;
  selectedDevice: ZeroconfService;
  deviceServiceInfoList: ZeroconfService[] = [];
  private readonly SERVICE_ENPOINT_URL: string = '/some';

  constructor(private http: Http) {
  }

  public sendData(data) {
    let endpointUrl = `http://${this.selectedDevice.ipv4Addresses[0]}:${this.selectedDevice.port}${this.SERVICE_ENPOINT_URL}`;
    alert('Calling: ' + endpointUrl + ' width: ' + JSON.stringify(data));
    return this.http.post(endpointUrl, data);
  }

}
