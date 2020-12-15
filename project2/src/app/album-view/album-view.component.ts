import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Album } from '../models/album';
import { User } from '../models/user';
import { Image } from '../models/image'; 
import { NONE_TYPE } from '@angular/compiler';
import { AlbumService } from '../services/album/album.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-album-view',
  templateUrl: './album-view.component.html',
  styleUrls: ['./album-view.component.css']
})
export class AlbumViewComponent implements OnInit {

    album: Album;


    public getAlbum() {
      if (this.route.snapshot.paramMap.get('id')) { // did not like the possibility of id being null, this condition verifies it isnt
        const id =  this.route.snapshot.paramMap.get('id');
        this.albumService.getSingleAlbum(Number(id))
          .subscribe(albumFromServer => {
            this.album = albumFromServer
            // console.log(albumFromServer)
             console.log(this.album)
          });
      }
    }
    

  constructor(
    private albumService: AlbumService,
    private route: ActivatedRoute
  ) {  }

  ngOnInit(): void {
    this.getAlbum();
  }

}
