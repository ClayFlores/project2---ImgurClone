import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Album } from '../models/album';
import { Image } from '../models/image';
import { User } from '../models/user';
import { AlbumService } from '../services/album/album.service';
import { FileUploadService } from '../services/fileUpload/file-upload.service';

@Component({
  selector: 'app-album-edit',
  templateUrl: './album-edit.component.html',
  styleUrls: ['./album-edit.component.css']
})
export class AlbumEditComponent implements OnInit {

  album: Album;
  selectedIndex: number = -1;

  fileToUpload: File |null = null;

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
    if (this.fileToUpload) {
      this.file.postFile(this.fileToUpload)
      .subscribe(uploaded => {
          console.log("came back " + uploaded)
      })
    }
}


public setRow(_index: number) {
  this.selectedIndex = _index;
  console.log(this.selectedIndex);
}




// this is not a great strategy, repeating code from album-view.ts
// ideally, would send the album over with the routing
public getAlbum() {
      if (this.route.snapshot.paramMap.get('id')) { // did not like the possibility of id being null, this condition verifies it isnt
        const id =  this.route.snapshot.paramMap.get('id');
        this.albumService.getSingleAlbum(Number(id))
          .subscribe(albumFromServer => {
            this.album = albumFromServer

             console.log(this.album)
          });
      }
    }
    constructor(
      private albumService: AlbumService,
      private route: ActivatedRoute,
      private file: FileUploadService
    ) { }

    ngOnInit(): void {

        this.getAlbum();
    }
  
}