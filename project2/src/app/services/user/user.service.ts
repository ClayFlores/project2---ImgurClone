import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  //represents the currently logged-in user; set to null if no one is logged in
  private _myUser: User | null;

  constructor(private http: HttpClient) { this._myUser = null; }

  //getter for currently logged-in user
  public get myUser(): User|null{ return this._myUser;}

  //sets myUser to the specified User object
  public login(newUser: User){
    this._myUser = newUser;
    console.log(this._myUser);
    this.http.post('http://localhost:8080/users/authenticate', newUser)
      .subscribe(response => console.log(response));
    console.log("we got here");
  }

  //sets myUser to null
  public logout(){this._myUser = null}

}
