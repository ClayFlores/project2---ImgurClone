import { AlbumComment } from './../models/AlbumComment';
import { Component, Input, OnInit } from '@angular/core';
import { Album } from '../models/album';

@Component({
  selector: 'app-album-tile',
  templateUrl: './album-tile.component.html',
  styleUrls: ['./album-tile.component.css']
})
export class AlbumTileComponent implements OnInit {

  @Input()
  album!: Album;
  constructor() { }

  ngOnInit(): void {
  }

  
  /*
  USE THIS ON THE ALBUM DETAIL PAGE
  submitNewComment(newComment: AlbumComment){
    this.album.comments.push(newComment);
    //todo: save the album on the server
  }
  */
}
