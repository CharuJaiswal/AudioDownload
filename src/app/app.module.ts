import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClient, HttpHeaders, HttpClientModule } from "@angular/common/http";
import { StreamingMedia } from '@ionic-native/streaming-media/ngx';
import { Network } from '@ionic-native/network/ngx';
import { Media, MediaObject } from '@ionic-native/media/ngx';
import { PlayerComponent } from './Pages/player/player.component';
import { DownloadlistComponent } from './Pages/downloadlist/downloadlist.component';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';
@NgModule({
  declarations: [
    AppComponent,
    PlayerComponent,DownloadlistComponent
  ],
  entryComponents: [],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(),
     AppRoutingModule,
     HttpClientModule,
    ],
  providers: [
    FileTransfer, FileTransferObject,File,
    StatusBar,
    SplashScreen,StreamingMedia,Network,Media,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
