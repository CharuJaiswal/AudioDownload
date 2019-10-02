import { Component, OnInit } from '@angular/core';
import { AudioService } from 'src/app/Services/audio.service';
import { Router } from '@angular/router';
import { ToastController, AlertController } from '@ionic/angular';
import { Network } from '@ionic-native/network/ngx';
import { NetworkService } from 'src/app/Services/network.service';
import { StreamingMedia, StreamingVideoOptions } from '@ionic-native/streaming-media/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-downloadlist',
  templateUrl: './downloadlist.component.html',
  styleUrls: ['./downloadlist.component.scss'],
})
export class DownloadlistComponent implements OnInit {
  dataArray: any=[];
  Url:any;
  fileTransfer: FileTransferObject;
  loaderToShow: any;
 dirs:any;
  constructor(public loadingController: LoadingController,private transfer: FileTransfer, private file: File,public router: Router,public toastController: ToastController,public network:Network,public networkService:NetworkService,private streamingMedia: StreamingMedia,public alertController: AlertController, public audio:AudioService) {
this.downloadList();

  }

  ngOnInit() {}



  downloadList(){
    
    this.dataArray=[ 
        {
           "description" : "Big Buck Bunny tells the story of a giant rabbit with a heart bigger than himself. When one sunny day three rodents rudely harass him, something snaps... and the rabbit ain't no bunny anymore! In the typical cartoon tradition he prepares the nasty rodents a comical revenge.\n\nLicensed under the Creative Commons Attribution license\nhttp://www.bigbuckbunny.org",
              "sources" :  "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" ,
              "subtitle" : "By Blender Foundation",
              "thumb" : "images/BigBuckBunny.jpg",
              "title" : "Big Buck Bunny"
            },
            { "description" : "The first Blender Open Movie from 2006",
              "sources" : "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4" ,
              "subtitle" : "By Blender Foundation",
              "thumb" : "images/ElephantsDream.jpg",
              "title" : "Elephant Dream"
            },
            { "description" : "HBO GO now works with Chromecast -- the easiest way to enjoy online video on your TV. For when you want to settle into your Iron Throne to watch the latest episodes. For $35.\nLearn how to use Chromecast with HBO GO and more at google.com/chromecast.",
              "sources" : "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4" ,
              "subtitle" : "By Google",
              "thumb" : "images/ForBiggerBlazes.jpg",
              "title" : "For Bigger Blazes"
            },
            { "description" : "Introducing Chromecast. The easiest way to enjoy online video and music on your TV—for when Batman's escapes aren't quite big enough. For $35. Learn how to use Chromecast with Google Play Movies and more at google.com/chromecast.",
              "sources" : "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4" ,
              "subtitle" : "By Google",
              "thumb" : "images/ForBiggerEscapes.jpg",
              "title" : "For Bigger Escape"
            },
            { "description" : "Introducing Chromecast. The easiest way to enjoy online video and music on your TV. For $35.  Find out more at google.com/chromecast.",
              "sources" :  "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4" ,
              "subtitle" : "By Google",
              "thumb" : "images/ForBiggerFun.jpg",
              "title" : "For Bigger Fun"
            },
            { "description" : "Introducing Chromecast. The easiest way to enjoy online video and music on your TV—for the times that call for bigger joyrides. For $35. Learn how to use Chromecast with YouTube and more at google.com/chromecast.",
              "sources" :  "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4" ,
              "subtitle" : "By Google",
              "thumb" : "images/ForBiggerJoyrides.jpg",
              "title" : "For Bigger Joyrides"
            },
            { "description" :"Introducing Chromecast. The easiest way to enjoy online video and music on your TV—for when you want to make Buster's big meltdowns even bigger. For $35. Learn how to use Chromecast with Netflix and more at google.com/chromecast.", 
              "sources" :  "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4" ,
              "subtitle" : "By Google",
              "thumb" : "images/ForBiggerMeltdowns.jpg",
              "title" : "For Bigger Meltdowns"
            },
      { "description" : "Sintel is an independently produced short film, initiated by the Blender Foundation as a means to further improve and validate the free/open source 3D creation suite Blender. With initial funding provided by 1000s of donations via the internet community, it has again proven to be a viable development model for both open 3D technology as for independent animation film.\nThis 15 minute film has been realized in the studio of the Amsterdam Blender Institute, by an international team of artists and developers. In addition to that, several crucial technical and creative targets have been realized online, by developers and artists and teams all over the world.\nwww.sintel.org",
              "sources" :  "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4" ,
              "subtitle" : "By Blender Foundation",
              "thumb" : "images/Sintel.jpg",
              "title" : "Sintel"
            },
      { "description" : "Smoking Tire takes the all-new Subaru Outback to the highest point we can find in hopes our customer-appreciation Balloon Launch will get some free T-shirts into the hands of our viewers.",
              "sources" : "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4" ,
              "subtitle" : "By Garage419",
              "thumb" : "images/SubaruOutbackOnStreetAndDirt.jpg",
              "title" : "Subaru Outback On Street And Dirt"
            }
          ]
    
  //   this.audio.getData().subscribe((res:any)=>{
  //    this.dataArray=res;
  //    console.log("title1",this.dataArray[0].title)

  //     this.Url=this.dataArray[0].sources;
  //    console.log("URL",this.Url);
  //  let data=this.dataArray.filter(x=> x.title);
  //  console.log("data",data);
  //   },(err)=>{
  //     console.log(err);
      
  //   });
  }

  OfflineVedioDownload(){
    alert('no offline vedio avalible')
  }
  stopaudio(){
    this.streamingMedia.stopAudio();
    console.log('the vedio stop');
    
  }
  AudioPlayOnline(url:any){

   if(this.networkService.isCurrentlyOnline()){
      let options: StreamingVideoOptions = {
        successCallback: () => { console.log('Video played') },
        errorCallback: (e) => { console.log('Error streaming') },
        orientation: 'landscape',
        shouldAutoClose: true,
        controls: false
      };
      this.streamingMedia.playAudio(url, options);
      console.log("audioplay online URL===>>>>",url);
      setTimeout(()=>{
        this.stopaudio();
      },3000);
      
      console.log("playOnline");
    
    }else{
     alert("no internet connectivity");
  
    }
    }

   
getStoragePath() {
  let file = this.file;
  return this.file
    .resolveDirectoryUrl(this.file.externalRootDirectory).then(function(directoryEntry) {
      return file.getDirectory(directoryEntry, "CharuAudioApp", {
          create: true,
          exclusive: false
        })
        .then(function() {
          return directoryEntry.nativeURL + "CharuAudioApp/";
        });
    });
}


downloadX=(filename,filePath)=>{
  this.getStoragePath().then((url) =>{
    console.log(url);
    
    this.fileTransfer = this.transfer.create();  
    this.fileTransfer.download(filePath, this.file.externalRootDirectory  + 'CharuAudioApp/' + filename + '.mp4',true).then((entry) => {  
    
      //here logging our success downloaded file path in mobile.  
      console.log("filepath",filePath);
      console.log("filepath",filename);
      
      console.log('download completed: ' + entry.toURL());  
      alert("download completed");
   
  }, (error) => {  
      //here logging our error its easier to find out what type of error occured.  
      console.log('download failed: ' + error);  
  });  
})


}
showLoader() {
  this.loaderToShow = this.loadingController.create({
    message: 'This Loader will Not AutoHide'
  }).then((res) => {
    res.present();

    res.onDidDismiss().then((dis) => {
      console.log('Loading dismissed!');
    });
  });
  this.hideLoader();
}

hideLoader() {
  setTimeout(() => {
    this.loadingController.dismiss();
  }, 4000);
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

vedioPlayOnline(){

  if(this.networkService.isCurrentlyOnline()){
    let options: StreamingVideoOptions = {
      successCallback: () => { console.log('Video played') },
      errorCallback: (e) => { console.log('Error streaming') },
      orientation: 'landscape',
shouldAutoClose: true,
controls: false
    };
    this.streamingMedia.playVideo('http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', options);
    console.log("playOnline");
    //  setTimeout(()=>{
    //   this.stopVedio();
    // },10000);
  }else{
   alert("no internet connectivity");
//  this.presentToastWithOptions();
  }
  }


  goToDownloads(){
    this.router.navigateByUrl('downloads')
    
  }

}
