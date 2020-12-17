import { AlbumService } from './../../services/album/album.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlbumEditGuard implements CanActivate {

  constructor(private albumService: AlbumService){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let myUserIdString:string|null = localStorage.getItem('userId');
      let myUserId:number = 0;
      if(myUserIdString)
        myUserId = +myUserIdString;
      let albumIdString = route.paramMap.get('id');
      let albumId = 0;
      if(albumIdString)
        albumId = +albumIdString;

      if(!myUserId)
        return false;
      
      return this.albumService.getDoesAlbumBelongToUser(myUserId, albumId);
  }
  
}
