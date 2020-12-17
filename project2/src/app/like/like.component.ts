import { Component, Input, OnInit } from '@angular/core';
import { AlbumService } from '../services/album/album.service';

@Component({
  selector: 'app-like',
  templateUrl: './like.component.html',
  styleUrls: ['./like.component.css']
})
export class LikeComponent implements OnInit {

  
  @Input() albumId:number=-1;
  myUserId:string|null = null;
  numLikes:number=0;
  isLiked:boolean=false;

  constructor(
    private albumService: AlbumService
  ) { }

  ngOnInit(): void {
    this.myUserId = localStorage.getItem('userId');
    if(this.albumId !== -1){
      this.getNumLikes();
      if(this.myUserId){
        this.checkIsAlbumInLikes();
      }
    }
  }

  ngOnChanges(){
    if(this.albumId !== -1){
      this.getNumLikes();
      if(this.myUserId){
        this.checkIsAlbumInLikes();
      }
    }
  }

  getNumLikes():void{
    this.albumService.getNumLikes(this.albumId)
      .subscribe(result=>{
        this.numLikes = result;
      });
  }

  checkIsAlbumInLikes(): void{
    if(this.myUserId)
      this.albumService.getIsAlbumInMyLikes(+this.myUserId, this.albumId)
      .subscribe(result=>{
        if(result === true)
          this.isLiked = true;
        
      });
  }

  likeAlbum():void{
    if(!this.isLiked && this.myUserId){
      this.numLikes++;
      this.isLiked = true;
      this.albumService.postLikeAlbum(+this.myUserId, this.albumId)
      .subscribe(result=>{
      })
    }
  }

}
