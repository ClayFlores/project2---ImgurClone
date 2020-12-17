import { Router } from '@angular/router';
import { UserService } from './../services/user/user.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @Input() myUser:string|null = null;
  @Output() onLogout: EventEmitter<number> = new EventEmitter<number>();

  constructor(public userService:UserService, private router: Router) { }

  ngOnInit(): void {
    
  }

  logout(){
    console.log("I'm clicked off!");
    this.userService.myUser=null;
    localStorage.clear();
    this.router.navigateByUrl("/");
    this.onLogout.emit(0);
  }

  
}
