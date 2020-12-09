import { Album } from './../models/album';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-upvote',
  templateUrl: './upvote.component.html',
  styleUrls: ['./upvote.component.css']
})
export class UpvoteComponent implements OnInit {
  @Input() album: Album;
  
  constructor() { }
  
  ngOnInit(): void {
  }

}
