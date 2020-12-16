import { AlbumService } from './../services/album/album.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Album } from '../models/album';
import { AlbumComment } from '../models/AlbumComment';
import { Tag } from '../models/tag';
import { Image } from './../models/image';

@Component({
  selector: 'app-search-result-page',
  templateUrl: './search-result-page.component.html',
  styleUrls: ['./search-result-page.component.css']
})
export class SearchResultPageComponent implements OnInit {

  tagName:string="";
  searchResults:Album[]=[];

  constructor(
    public route:ActivatedRoute,
    private albumService: AlbumService
  ) { }

  ngOnInit(): void {
    console.log("search result page init")
    this.makeTagName();
  }

  

  public makeTagName():void{
    this.route.queryParams.subscribe(params=>{
      this.tagName=params['tagName'];
      console.log(this.tagName)
      this.getSearchResults()
    });
  }

  public getSearchResults(): void{    
    
    this.albumService.getAlbumsByTagName(this.tagName)
    .subscribe(albums => {

      let albumsArray: Album[] = []

      for(let album of albums){
        let id: number = album.id;

        let title: string = album.albumTitle;

        let user = null;

        let images: Image[] = []
        for(let image of album.imageSet){
          let imageId: number = image.id;
          let imageURL: string = image.imagePath;
          let caption: string = image.caption;
          let dateSubmitted: Date = new Date(image.dateSubmitted)
          images.push(new Image(imageId, imageURL, caption, dateSubmitted))
        }

        //change this when we get the upvote count
        let upvoteCount = 0;

        let dateCreated: Date = new Date(album.dateCreated)

        //change this when we implement tags
        let tags: Tag[] = [];

        let comments: AlbumComment[] =[];
        for(let comment of album.commentSet){
          let commentId: number = comment.id;
          let userCommenter = null;
          let dateSubmitted: Date = new Date(comment.dateSubmitted);
          let commentBody = comment.body;
          comments.push(new AlbumComment(commentId, userCommenter, dateSubmitted, commentBody))
        }

        albumsArray.push(new Album(id, title, user, images, upvoteCount, dateCreated, tags, comments))
      }

      this.searchResults = albumsArray;
      console.log("search results")
      console.log(this.searchResults)
    })
    
  }

}
