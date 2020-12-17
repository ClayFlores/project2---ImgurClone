import { AlbumService } from './../services/album/album.service';
import { Component, Input, OnInit } from '@angular/core';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css']
})
export class FavoriteComponent implements OnInit {

  @Input() albumId:number=-1;
  myUserId:string|null = null;
  isFavorited:boolean=false;

  constructor(
    private albumService: AlbumService
  ) { }

  ngOnInit(): void {
    this.myUserId = localStorage.getItem('userId');
    if(this.myUserId && this.albumId!==-1)
      this.checkIsAlbumInFavorites();
  }

  ngOnChanges(){
    if(this.myUserId && this.albumId!==-1)
      this.checkIsAlbumInFavorites();
  }

  checkIsAlbumInFavorites(): void{
    if(this.myUserId)
      this.albumService.getIsAlbumInMyFavorites(+this.myUserId, this.albumId)
      .subscribe(result=>{
        if(result === true)
          this.isFavorited = true;
        
      });
  }

  favoriteAlbum():void{
    if(!this.isFavorited && this.myUserId)
      this.albumService.postFavoriteAlbum(+this.myUserId, this.albumId)
      .subscribe(result=>{
        this.isFavorited = true;
      })
  }

}
