import { AlbumService } from './../services/album/album.service';
import { UserService } from './../services/user/user.service';
import { AlbumComment } from './../models/AlbumComment';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  newCommentBody: string="";

  @Input() comments: AlbumComment[]=[];
  @Input() albumId: number=0;
  @Output() onSubmitNewComment: EventEmitter<AlbumComment> = new EventEmitter<AlbumComment>();

  constructor(
    public userService: UserService,
    public albumService: AlbumService
  ) { }

  ngOnInit(): void {

  }

  onSubmitClick(form:any){
    if(this.newCommentBody.length < 1 || this.newCommentBody.length >= 1000 || !this.userService.myUser || this.userService.myUser.id === 0 ||this.albumId===0) 
      return;
    this.albumService.postNewComment(this.newCommentBody, this.albumId)
      .subscribe(commentJson => {
        
        let commentId: number = commentJson.id;
        let userCommenter = null;
        let dateSubmitted: Date = new Date(commentJson.dateSubmitted);
        let commentBody = commentJson.body;

        let myComment = new AlbumComment(commentId, userCommenter, dateSubmitted, commentBody);
        console.log(myComment);
        this.onSubmitNewComment.emit(myComment);
      })
  }

  /*
  //USE THIS METHOD WHEREVER THE COMMENT COMPONENT GOES
  submitNewComment(newComment: AlbumComment){
    this.album.comments.push(newComment);
  }

  AND PUT THIS IN THE TEMPLATE 
  <app-comments [comments]="album.comments" [albumId]="album.id" (onSubmitNewComment)="submitNewComment($event)"></app-comments>
        
  */

}
