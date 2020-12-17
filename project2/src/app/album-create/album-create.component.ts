import { Router } from '@angular/router';
import { AlbumService } from './../services/album/album.service';
import { UserService } from './../services/user/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-album-create',
  templateUrl: './album-create.component.html',
  styleUrls: ['./album-create.component.css']
})
export class AlbumCreateComponent implements OnInit {
  albumTitle: string="";
  myUserId = localStorage.getItem('userId')

  constructor(
    public userService: UserService,
    private albumService: AlbumService,
    private router: Router
    ) { }

  ngOnInit(): void {
  }

  onSubmitClick(form:any):void{
    if(this.albumTitle.length<1 || this.albumTitle.length >=250 || !this.myUserId || +this.myUserId === 0) return;
    this.albumService.postNewAlbum(this.albumTitle).subscribe(resultId => this.router.navigateByUrl('/album/'+resultId+"/edit"));
  }

}
