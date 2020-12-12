import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // represents the currently logged-in user; set to null if no one is logged in
  private _myUser: User | null | any;

  constructor(private http: HttpClient) {
    this._myUser = null;
  }

  // getter for currently logged-in user
  public get myUser(): User | null {
    return this._myUser;
  }

  public set myUser(user) {
    this._myUser =  user;
  }

  // sets myUser to the specified User object
  public login(newUser: User): Observable<any> {
    return this.http.post('http://localhost:8080/users/authenticate', newUser)
      .pipe(
        tap(response => {
           this._myUser = response;
           // console.log('This is the myUser in service', this._myUser);
           return this._myUser;
        }),
        catchError(this.handleError<User>('login', undefined))
      );
  }

  // sets myUser to null
  public logout() {
    this._myUser = null;
    localStorage.clear();
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}

