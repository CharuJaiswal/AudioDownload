import { Injectable } from '@angular/core';
import { Network } from '@ionic-native/network/ngx';

@Injectable({
  providedIn: 'root'
})
export class NetworkService {

  constructor( public network: Network) { }
  
  public isCurrentlyOnline(): boolean {
    console.log(this.network);
    return this.network.type.toLowerCase() !== 'none';
  }
}
