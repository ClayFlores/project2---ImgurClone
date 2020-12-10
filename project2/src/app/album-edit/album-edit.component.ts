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

  // sample album data 
  users: User[] = [
    new User(1, "pw", "test@test.com"),
    new User(2, "pwpw", "a@b.com")
  ]

  imageSet: Image[] = [
    new Image(1, '../assets/pizza.png','pizza', new Date()),
    new Image(2, '../assets/macaron.png','macaron', new Date()),
    new Image(3, '../assets/orange.png','orange', new Date()),
    new Image(4, '../assets/broccoli.png', 'broccoli', new Date())
  ]

  Album = new Album(1, 'test images', this.users[0], this.imageSet, 0, new Date(), [],[])

    constructor() { }

    ngOnInit(): void {
    }
  
}