import { Image } from './../models/image';
import { User } from 'src/app/models/user';
import { AlbumService } from './../services/album/album.service';
import { Component, OnInit } from '@angular/core';
import { Album } from '../models/album';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  homepageAlbums: Album[] = [];

  constructor(
    private albumService: AlbumService
  ) { }

  ngOnInit(): void {
    this.getHomepageAlbums();
  }

  public getHomepageAlbums(): void{
    
    //for now, going to create a stock array of albums; this will be replaced with a call to the albumService which will return a list from the db
    let users: User[] = [
      new User(1, 'password', 'test1@example.com'),
      new User(2, 'password', 'henry_flower@notcheating.net')
    ];
    let images: Image[] = [
      new Image(1, 'www.spockthedog.com/wp-content/uploads/2013/08/Basset-Hound-Flower-For-You.jpg', 'cute flower dog', new Date()),
      new Image(2, 'https://pixfeeds.com/images/topic/2880/1200-2880-basset-hounds-photo3.jpg', 'dog with cat', new Date()),
      new Image(3, 'https://jamesjoyceproject.files.wordpress.com/2012/05/james-joyce.jpg', 'henry flower', new Date()),
      new Image(4, 'www.thenation.com/wp-content/uploads/2015/04/01.13photo.jpg', 'guitar man', new Date())
    ]
    let albums: Album[] = [
      new Album(1, 'bassets', users[0], [images[0], images[1]], 100, new Date(), [], []), 
      new Album(2, 'joyce pics', users[1], [images[2], images[3]], 50, new Date(), [], [])
    ]

    this.homepageAlbums = albums;
  
    
    /*
    this.albumService.getAlbums()
    .subscribe(albums => {
      this.homepageAlbums = albums;
      console.log("HOMEPAGE")
      console.log(this.homepageAlbums)
    })
    */
    
    
    
  }

}
