import { AlbumService } from './../services/album/album.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  
  constructor(
    private albumService: AlbumService
  ) { }

  ngOnInit(): void {
  }

}
