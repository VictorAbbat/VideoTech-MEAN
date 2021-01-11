import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddVideoComponent } from './add-video/add-video.component';
import { AppComponent } from './app.component';
import { ListVideosComponent } from './list-videos/list-videos.component';

const routes: Routes = [

  { path: '', component: AddVideoComponent },
  { path: 'videos', component: ListVideosComponent },

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  bootstrap: [AppComponent]
})
export class AppRoutingModule { }

