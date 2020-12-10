import { HomepageComponent } from './homepage/homepage.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './services/InMemoryData/in-memory-data.service';

import { AlbumEditComponent } from './album-edit/album-edit.component';
import { AlbumViewComponent } from './album-view/album-view.component';

import { LoginComponent } from './login/login.component';
import {FormsModule} from "@angular/forms";
import { CommonModule } from '@angular/common';
import { UpvoteComponent } from './upvote/upvote.component';

@NgModule({
  declarations: [
    AppComponent,
    AlbumEditComponent,
    AlbumViewComponent,
    LoginComponent,
    HomepageComponent,
    UpvoteComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,

    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, {dataEncapsulation: false}
    ),
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
