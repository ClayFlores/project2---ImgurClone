import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Album } from '../models/album';
import { User } from '../models/user';
import { Image } from '../models/image'; 
import { NONE_TYPE } from '@angular/compiler';
import { AlbumService } from '../services/album/album.service';
import { ActivatedRoute, Router } from '@angular/router';

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

            // would be a more consistent way to do things, similar to davids approach
            // will come back to if there is time
            // this.album.id = albumFromServer.id;
            // this.album.title = albumFromServer.title;
            // this.album.dateCreated = albumFromServer.dateCreated;
            // for(let Image of albumFromServer.images){
            //   this.album.images.push(Image);
            // }
            // this.album.tags = albumFromServer.tags;
            // this.album.comments = albumFromServer.comments;

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
