import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Album } from '../models/album';
import { Image } from '../models/image';
import { User } from '../models/user';
import { Tag } from '../models/tag';
import { AlbumService } from '../services/album/album.service';
import { FileUploadService } from '../services/fileUpload/file-upload.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { AlbumComment } from '../models/AlbumComment';
import {Router} from '@angular/router';



@Component({
  selector: 'app-album-edit',
  templateUrl: './album-edit.component.html',
  styleUrls: ['./album-edit.component.css']
})
export class AlbumEditComponent implements OnInit {

  album: any;
  selectedIndex: number = -1;


  form: FormData;
  imageCaption = '';
  newTag = '';

  // fileToUpload: File |null = null;
  serverURL = 'http://localhost:8080/project2-server/files/upload';
  //  uploadForm: FormGroup = new FormGroup();




onFileSelect(event: any) {
  if (event.target.files.length > 0) {
        const file = event.target.files[0];
        // this.uploadForm.get('profile').setValue(file);

        // this.form = new FormData();
        this.form.append('user-file', file, file.name);
        this.form.append('albumId', this.album.id.toString());
        console.log(this.album.id);
    }
    this.getAlbum(); // called after to hopefully show the new addition
}

onDeleteSubmit(){
  
}

onSubmit() {
  const url = 'album/' + this.album.id + '/edit';
  this.form.append('imageCaption', this.imageCaption);
  this.httpClient.post<any>(this.serverURL, this.form).subscribe(
    (res) => {
      console.log(res);
    }
  );
  this.router.navigate([url]);
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

            //this.album = albumFromServer
              let id: number = albumFromServer.id;
      
              let title: string = albumFromServer.albumTitle;
      
              let user = null;
      
              let images: Image[] = []
              for(let image of albumFromServer.imageSet){
                let imageId: number = image.id;
                let imageURL: string = image.imagePath;
                let caption: string = image.caption;
                let dateSubmitted: Date = new Date(image.dateSubmitted)
                images.push(new Image(imageId, imageURL, caption, dateSubmitted))
              }
      
              //change this when we get the upvote count
              let upvoteCount = 0;
      
              let dateCreated: Date = new Date(albumFromServer.dateCreated)
      
              //change this when we implement tags
              let tags: Tag[] = [];
      
              let comments: AlbumComment[] =[];
              for(let comment of albumFromServer.commentSet){
                let commentId: number = comment.id;
                let userCommenter = null;
                let dateSubmitted: Date = new Date(comment.dateSubmitted);
                let commentBody = comment.body;
                comments.push(new AlbumComment(commentId, userCommenter, dateSubmitted, commentBody))
              }
      
              this.album = new Album(id, title, user, images, upvoteCount, dateCreated, tags, comments)
              console.log(this.album)
            });
      }
    }
    constructor(
      private albumService: AlbumService,
      private route: ActivatedRoute,
      private file: FileUploadService,
      private formBuilder: FormBuilder,
      private httpClient: HttpClient,
      private router: Router
    ) { this.form = new FormData();
        this.album = new Album(0, '', null, [], 0, new Date(), [], []);
      }

    ngOnInit(): void {
        this.getAlbum();
        console.log(this.album.id);
        console.log('inside ngoninit' , this.album);
    }

    // TODO need some kind of alert that it was successfully created
  tagSubmit() {
    const url = 'album/' + this.album.id + '/edit';
    if (this.newTag === '') {
      console.log('tag needs to be not empty');
    } else {
      this.albumService.addNewTagToAlbum(this.album.id, this.newTag)
        .subscribe(response => {
          this.newTag = '';
        });
    }
  }
}
