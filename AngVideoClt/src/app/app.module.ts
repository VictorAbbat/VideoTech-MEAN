import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddVideoComponent } from './add-video/add-video.component';
import { ListVideosComponent } from './list-videos/list-videos.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MessageComponent } from './message/message.component';
@NgModule({
  imports: [
    FormsModule,
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    AddVideoComponent,
    ListVideosComponent,
    MessageComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
