import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AudioService } from '../Services/audio.service';
import { StreamingMedia, StreamingVideoOptions } from '@ionic-native/streaming-media/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
url='http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4';
  constructor(private streamingMedia: StreamingMedia,public audio:AudioService,public alertController: AlertController) {
  
  }


  Offlinedownload(){

     this.audio.getData().subscribe((res:any)=>{
       console.log("response=====>>>>");
       console.log(res);
           
     },(err)=>{
       console.log(err);
       
     })
    console.log("Off line download");
  }

  playOnline(){

    let options: StreamingVideoOptions = {
      successCallback: () => { console.log('Video played') },
      errorCallback: (e) => { console.log('Error streaming') },
      orientation: 'landscape',
      shouldAutoClose: true,
      controls: false
    };
    this.streamingMedia.playVideo('http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4', options);
    console.log("playOnline");
    
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
            this.Offlinedownload();
          }
        }, {
          text: 'Play Online',
          handler: () => {
            this.playOnline();
          }
        }
      ]
    });

    await alert.present();
  }
}
