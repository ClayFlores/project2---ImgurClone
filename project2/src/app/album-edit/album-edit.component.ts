import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Album } from '../models/album';
import { Image } from '../models/image';
import { User } from '../models/user';
import { AlbumService } from '../services/album/album.service';
import { FileUploadService } from '../services/fileUpload/file-upload.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders  } from '@angular/common/http';


@Component({
  selector: 'app-album-edit',
  templateUrl: './album-edit.component.html',
  styleUrls: ['./album-edit.component.css']
})
export class AlbumEditComponent implements OnInit {

  album:   any;
  selectedIndex: number = -1;

  //fileToUpload: File |null = null;
  serverURL = "http://localhost:8080/files/upload";
  //  uploadForm: FormGroup = new FormGroup(); 
  
//   handleFileInput(files: FileList) {
//     this.fileToUpload = files.item(0);
//     if (this.fileToUpload) {
//       this.file.postFile(this.fileToUpload)
//       .subscribe(uploaded => {
//           console.log("came back " + uploaded)
//       })
//     }
// }

onFileSelect(event: any) {
  if (event.target.files.length > 0) {
        const file = event.target.files[0];
        //this.uploadForm.get('profile').setValue(file);

        const formData = new FormData();
        formData.append('file', file);
        console.log(formData.get('file'));
        const httpOptions = {
          headers: new HttpHeaders({
            'Accept': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'multipart/form-data' 
          })}
        this.httpClient.post<any>(this.serverURL, formData, httpOptions ).subscribe(
          (res) => console.log(res)
    );
    }
}

onSubmit() {
  const formData = new FormData();
  //formData.append('file', this.uploadForm.get('profile').value);

  this.httpClient.post<any>(this.serverURL, formData).subscribe(
    (res) => console.log(res)
  );
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
      private file: FileUploadService,
      private formBuilder: FormBuilder,
      private httpClient: HttpClient
    ) { }

    ngOnInit(): void {

        this.getAlbum();
        // this.uploadForm = this.formBuilder.group({
        //   profile: ['']
        //});
    }
  
}