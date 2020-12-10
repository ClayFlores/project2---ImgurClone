import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Album } from '../models/album';
import { User } from '../models/user';
import { Image } from '../models/image'; 

@Component({
  selector: 'app-album-view',
  templateUrl: './album-view.component.html',
  styleUrls: ['./album-view.component.css']
})
export class AlbumViewComponent implements OnInit {

    // borrowing some of Davids setup syntax for now
    // will be replaced later by actual data
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

    albumSet: Album = new Album(1, 'test images', this.users[0], this.imageSet, 0, new Date(), [],[])


  constructor() {  }

  ngOnInit(): void {

  }

}
