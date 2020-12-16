import { UserService } from './../services/user/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-album-create',
  templateUrl: './album-create.component.html',
  styleUrls: ['./album-create.component.css']
})
export class AlbumCreateComponent implements OnInit {
  albumTitle: string="";
  constructor(
    private userService: UserService
    ) { }

  ngOnInit(): void {
  }

  onSubmitClick(form:any):void{
    if(this.albumTitle.length<1 || this.albumTitle.length >=250) return;
    
  }

}
