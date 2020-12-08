import { Component, OnInit } from '@angular/core';
import {UserService} from '../services/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private userService: UserService) {
    this.userService = userService;
  }

  ngOnInit(): void {
  }

}
