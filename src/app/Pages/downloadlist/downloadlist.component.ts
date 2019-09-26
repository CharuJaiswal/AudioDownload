import { Component, OnInit } from '@angular/core';
import { AudioService } from 'src/app/Services/audio.service';
import { Router } from '@angular/router';
import { ToastController, AlertController } from '@ionic/angular';
import { Network } from '@ionic-native/network/ngx';
import { NetworkService } from 'src/app/Services/network.service';
import { StreamingMedia, StreamingVideoOptions } from '@ionic-native/streaming-media/ngx';

@Component({
  selector: 'app-downloadlist',
  templateUrl: './downloadlist.component.html',
  styleUrls: ['./downloadlist.component.scss'],
})
export class DownloadlistComponent implements OnInit {
  dataArray: any=[];
  Url:any;

  constructor(public router: Router,public toastController: ToastController,public network:Network,public networkService:NetworkService,private streamingMedia: StreamingMedia,public alertController: AlertController, public audio:AudioService) {
this.downloadList();
  }

  ngOnInit() {}



  downloadList(){
    this.audio.getData().subscribe((res:any)=>{
     this.dataArray=res;
     console.log("title1",this.dataArray[0].title)

      this.Url=this.dataArray[0].sources;
     console.log("URL",this.Url);
   let data=this.dataArray.filter(x=> x.title);
   console.log("data",data);
    },(err)=>{
      console.log(err);
      
    });
  }
  vedioPlayOnline(){

    // if(this.networkService.isCurrentlyOnline()){
      let options: StreamingVideoOptions = {
        successCallback: () => { console.log('Video played') },
        errorCallback: (e) => { console.log('Error streaming') },
        orientation: 'landscape',
        shouldAutoClose: true,
        controls: false
      };
      this.streamingMedia.playVideo(this.Url, options);
      console.log("vedioplay online URL===>>>>",this.Url);
      
      console.log("playOnline");
    
    // }else{
    //  alert("no internet connectivity");
  
    // }
    }

    abc(){
      alert('bgvfdgb');
    }
}
