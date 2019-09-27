import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { PlayerComponent } from './Pages/player/player.component';
import { DownloadlistComponent } from './Pages/downloadlist/downloadlist.component';

const routes: Routes = [
  { path: '', redirectTo: 'downloadlist', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  { path:'player',component:PlayerComponent},
  {path:'downloadlist',component:DownloadlistComponent}

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
