import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AudioService } from '../Services/audio.service';
import { StreamingMedia, StreamingVideoOptions } from '@ionic-native/streaming-media/ngx';

import { Network } from '@ionic-native/network/ngx';
import { NetworkService } from '../Services/network.service';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
url='http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4';
  constructor(public router: Router,public toastController: ToastController,public network:Network,public networkService:NetworkService,private streamingMedia: StreamingMedia,public audio:AudioService,public alertController: AlertController) {
  
  }


  OfflineAdioDownload(){
 
  console.log("Off line download");
  
  }

  OfflineVedioDownload(){
 
    console.log("Off line vedio download");
    
    }
  
  AudioplayOnline(){

  if(this.networkService.isCurrentlyOnline()){
    let options: StreamingVideoOptions = {
      successCallback: () => { console.log('audio played') },
      errorCallback: (e) => { console.log('Error streaming') },
      // orientation: 'landscape',
      shouldAutoClose: true,
      controls: false
    };
    this.streamingMedia.playAudio('http://soundbible.com/grab.php?id=2196&type=mp3', options);
    console.log("playOnline");
     setTimeout(()=>{
      this.stopaudio();
    },3000);
  }else{
   alert("no internet connectivity");
//  this.presentToastWithOptions();
  }
  }

  stopaudio(){
    this.streamingMedia.stopAudio();
    console.log('the vedio stop');
    
  }


  vedioPlayOnline(){

    if(this.networkService.isCurrentlyOnline()){
      let options: StreamingVideoOptions = {
        successCallback: () => { console.log('Video played') },
        errorCallback: (e) => { console.log('Error streaming') },
        orientation: 'landscape',
  shouldAutoClose: true,
  controls: false
      };
      this.streamingMedia.playVideo(this.url, options);
      console.log("playOnline");
      //  setTimeout(()=>{
      //   this.stopVedio();
      // },10000);
    }else{
     alert("no internet connectivity");
  //  this.presentToastWithOptions();
    }
    }


gotoDownloadPage(){
  this.router.navigateByUrl('downloadlist');
}
  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      // header: 'Confirm!',
      message: '<strong>You Want Download/Play Audio</strong>!!!',
      buttons: [
        {
          text: 'Ofline',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel: blah');
            this.OfflineAdioDownload();
          }
        }, {
          text: 'Play Online',
          handler: () => {
            this.AudioplayOnline();
          }
        }
      ]
    });

    await alert.present();
  }

async presentAlertConfirm1() {
    const alert = await this.alertController.create({
      // header: 'Confirm!',
      message: '<strong>You Want Download/Play Vedio</strong>!!!',
      buttons: [
        {
          text: 'OFline',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel: blah');
            this.OfflineVedioDownload();
          }
        }, {
          text: 'Play Online',
          handler: () => {
            this.vedioPlayOnline();
          }
        }
      ]
    });

    await alert.present();
  }

  async presentToastWithOptions() {
    const toast = await this.toastController.create({
      header: 'No Internet Connectivity',
      message: 'Please Connect To The Internet',
      position: 'top',
      buttons: [
        {
          side: 'start',
          icon: 'star',
          text: 'Favorite',
          handler: () => {
            console.log('Favorite clicked');
          }
        }, {
          text: 'Done',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    toast.present();
  }
}
