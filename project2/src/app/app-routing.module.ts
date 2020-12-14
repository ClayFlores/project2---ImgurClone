import { MyAlbumsComponent } from './my-albums/my-albums.component';
import { HomepageComponent } from './homepage/homepage.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import { AlbumViewComponent } from './album-view/album-view.component';
import { AlbumEditComponent } from './album-edit/album-edit.component';
import {RegistrationComponent} from "./registration/registration.component";

const routes: Routes = [
  {path: 'login', component: LoginComponent },
  {path:'', component: HomepageComponent},
  {path:'album/:id', component: AlbumViewComponent},
  {path:'album/:id/edit', component: AlbumEditComponent},
  {path: 'register', component: RegistrationComponent},
  {path:'myAlbums', component: MyAlbumsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
