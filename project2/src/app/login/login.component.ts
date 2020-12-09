import { Component, OnInit } from '@angular/core';
import {UserService} from '../services/user/user.service';
import {User} from "../models/user";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

   currentUser: User;
   submitted = false;

  constructor(private userService: UserService) {
    if (userService.myUser) {
      // return to homepage
    }

    this.currentUser = {} as User;
  }

  ngOnInit(): void {
  }


  // tslint:disable-next-line:typedef
  onSubmit() {
    this.submitted = true;
    this.userService.login(this.currentUser);
  }

}
