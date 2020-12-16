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

  
  
  
  
}
