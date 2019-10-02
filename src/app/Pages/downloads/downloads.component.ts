import { Component, OnInit } from '@angular/core';
import { AudioService } from 'src/app/Services/audio.service';
import { Router } from '@angular/router';
import { ToastController, AlertController, Platform } from '@ionic/angular';
import { Network } from '@ionic-native/network/ngx';
import { NetworkService } from 'src/app/Services/network.service';
import { StreamingMedia, StreamingVideoOptions } from '@ionic-native/streaming-media/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';
import { LoadingController } from '@ionic/angular';
import { VideoPlayer } from '@ionic-native/video-player/ngx';

@Component({
  selector: 'app-downloads',
  templateUrl: './downloads.component.html',
  styleUrls: ['./downloads.component.scss'],
})
export class DownloadsComponent implements OnInit {
  dirs:any;
  _fileList: any;
  constructor( private videoPlayer: VideoPlayer,public network:Network,public networkService:NetworkService,private streamingMedia: StreamingMedia, public platform: Platform,private transfer: FileTransfer, private file: File,public router: Router,) {
    this. goToDir()
   }

  ngOnInit() {}


  goToDir()
  {
  
    this.file.listDir(this.file.externalRootDirectory,'CharuAudioApp/').then(
      (list) => {

          this.dirs=list; 
          console.log("dirs",this.dirs);
          console.log("dirs",this.dirs[39]);
          
          for(let file of this.dirs)
          {
            if(file.isDirectory == true && file.name !='.' && file.name !='..'){
              // Code if its a folder
              console.log("its a folder");
           
            let folderName= file.name;
            let folderPath= file.fullPath;
            console.log("folderName",folderName);
            console.log("folderPath",folderPath);
               }else if(file.isFile == true){
              // Code if its a file
              console.log("its a file");
              let name=file.name // File name
              let path=file.nativeURL // File path
              console.log("name",name);
              console.log("path",path);
            
              
            
              
                file.getMetadata(function (metadata) {
                let size=metadata.size; // Get file size
                 console.log("size==>>", size);
                 
                })
             }
          }
      }
  );

  
  }

playVedio(path:any){
  let options: StreamingVideoOptions = {
    successCallback: () => { console.log('Video played') },
    errorCallback: (e) => { console.log('Error streaming') },
    orientation: 'landscape',
shouldAutoClose: true,
controls: false
  };
  this.streamingMedia.playVideo(path, options);
  console.log("playOnline");
}

abc(){
  this.videoPlayer.play('http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4').then(() => {
 console.log('video completed');
}).catch(err => {
 console.log(err);
});
}
}