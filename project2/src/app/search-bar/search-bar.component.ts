import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
  tagName:String="";
  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  onSubmitClick(form:any){
    if(form.status === "INVALID") return;
    //console.log(this.tagName)
    this.router.navigateByUrl('/search?tagName='+this.tagName);
  }

}
