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
  @Input() comments: AlbumComment[];
  @Output() onSubmitNewComment: EventEmitter<AlbumComment> = new EventEmitter<AlbumComment>();

  constructor(
    public userService: UserService
  ) { }

  ngOnInit(): void {

  }

  onSubmitClick(form:any){
    if(form.status === "INVALID") return;
    this.onSubmitNewComment.emit(new AlbumComment(null, this.userService.myUser, null, this.newCommentBody));

  }

}
