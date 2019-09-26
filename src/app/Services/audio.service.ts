import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { StreamingMedia, StreamingVideoOptions } from '@ionic-native/streaming-media/ngx';

@Injectable({
  providedIn: 'root'
})
export class AudioService {
// url="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4";
url='http://localhost:8080/videos';
//url='assets/data/vedioData.json'
// url1='../ ';
  constructor(private streamingMedia: StreamingMedia,public http:HttpClient) { }
   
  getData(){
    return this.http.get(this.url)
  }

  playOnline1(){

    let options: StreamingVideoOptions = {
      successCallback: () => { console.log('audio played') },
      errorCallback: (e) => { console.log('Error streaming') },
     // orientation: 'landscape',
      shouldAutoClose: true,
      controls: false
    };
    
  return  this.streamingMedia.playAudio(this.url, options);
    
    
  }
}
