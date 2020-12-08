import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _myUser: User | null;

  constructor() { this._myUser = null; }

  public get myUser(): User|null{ return this._myUser;}

  //sets myUser to the specified User object
  public login(newUser: User){ this._myUser = newUser}

  //sets myUser to null
  public logout(){this._myUser = null}

}
