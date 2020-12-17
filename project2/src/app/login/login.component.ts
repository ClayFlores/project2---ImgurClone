import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {UserService} from '../services/user/user.service';
import {User} from '../models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  
  @Output() onLogin: EventEmitter<number> = new EventEmitter<number>();

   currentUser: User;
   submitted = false;


  constructor(private userService: UserService, private router: Router) {
    if (userService.myUser) {
      // return to homepage
    }

    this.currentUser = {} as User;
  }

  ngOnInit(): void {
  }


  onSubmit() {
    this.submitted = true;
    this.userService.login(this.currentUser)
      .subscribe(response => {
        this.currentUser = response;
        // console.log('This is the User in login component', this.currentUser);
        localStorage.clear();
        localStorage.setItem('userId', String(this.currentUser.id));
        localStorage.setItem('userEmail', this.currentUser.email);
        this.onLogin.emit(this.currentUser.id);
        this.router.navigate(['/']);
      },
        error => console.log('Something went wrong during login'));
  }

}
