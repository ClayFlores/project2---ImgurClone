import { Component, OnInit } from '@angular/core';
import { Album } from '../models/album';
import { Image } from '../models/image';
import { User } from '../models/user';

@Component({
  selector: 'app-album-edit',
  templateUrl: './album-edit.component.html',
  styleUrls: ['./album-edit.component.css']
})
export class AlbumEditComponent implements OnInit {

    constructor() { }

    ngOnInit(): void {
    }
  
}