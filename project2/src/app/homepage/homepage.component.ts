import { Image } from './../models/image';
import { User } from 'src/app/models/user';
import { AlbumService } from './../services/album/album.service';
import { Component, OnInit } from '@angular/core';
import { Album } from '../models/album';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  homepageAlbums: any[] = [];
  constructor(
    private albumService: AlbumService
  ) { }

  ngOnInit(): void {
    this.getHomepageAlbums();
  }

  public getHomepageAlbums(): void{    
    
    this.albumService.getAlbumsForHomepage()
    .subscribe(albums => {
      this.homepageAlbums = albums;
      console.log("HOMEPAGE")
      console.log(this.homepageAlbums)
    })
    
  }

}
