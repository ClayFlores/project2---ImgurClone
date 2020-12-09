import { Image } from './../../models/image';
import { User } from 'src/app/models/user';
import { Album } from './../../models/album';
import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  createDb(){
    let users: User[] = [
      new User(1, "password", "test1@example.com"),
      new User(2, "password2", "test2@example.com")
    ]
    let images: Image[] = [
      new Image(1, 'https://www.petpaw.com.au/wp-content/uploads/2014/03/Basset-Hound-1.jpg', 'doggy',
      new Date()),
      new Image(2, 'https://4.bp.blogspot.com/-2bumVLpI6wE/ToOVU9_7OhI/AAAAAAAAAQY/6NathnDAGhk/s1600/bassethound.jpg',
      'doggy 2', new Date())
    ]
    const albums: Album[] = [
      new Album(1, 'bassets', users[0], images, 0, new Date(), [], [])
    ];

    console.log(albums[0])
    console.log(albums[0].images)
    return {albums};
  }
}
