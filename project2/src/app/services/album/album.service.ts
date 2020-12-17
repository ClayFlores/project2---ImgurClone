import { UserService } from './../user/user.service';
import { Album } from './../../models/album';

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {

  private albumsUrl = 'http://localhost:8080/project2-server/albums';
  private usersUrl = 'http://localhost:8080/project2-server/users';

  constructor(private http: HttpClient,
    private userService: UserService) { }

  /** GET albums from the server */
  getAlbumsForHomepage(): Observable<any[]> {
    return this.http.get<Album[]>(this.albumsUrl+"/homepageAlbums")
      .pipe(
        tap(_ => console.log('fetched albums')),
        catchError(this.handleError<Album[]>('getAlbumsForHomepage', []))
      );
  }


  /** GET single album from server */
  getSingleAlbum (id : number): Observable<any> {
    return this.http.get<Album>(this.albumsUrl+"/"+id)
      .pipe(
        tap(_=> console.log('fetched single album')),
        catchError(this.handleError<Album>('getSingleAlbum'))
      );
  }

  getAlbumsForMyAlbums(): Observable<any[]>{
    return this.http.get<Album[]>(this.albumsUrl+"/byUser/"+localStorage.getItem('userId'))
      .pipe(
        tap(_ => console.log('fetched albums')),
        catchError(this.handleError<Album[]>('getAlbumsForMyAlbums', []))
      );
  }

  getAlbumsByTagName(tagName:string): Observable<any[]>{
    return this.http.get<Album[]>(this.albumsUrl+"/byTag/"+tagName)
      .pipe(
        tap(_ => console.log('fetched albums')),
        catchError(this.handleError<Album[]>('getAlbumsByTagName', []))
      );
  }

  postNewAlbum(title: string):Observable<any>{
    const formData = new FormData();
    formData.append('albumTitle', title);
    let id: string = ""+localStorage.getItem('userId');
    formData.append('userId', id);

    return this.http.post<any>(this.albumsUrl+"/createAlbum", formData)
    .pipe(
      tap(_ => console.log('created album')),
      catchError(this.handleError<Album[]>('postNewAlbum', []))
    );
  }

  postNewComment(myBody:string, myAlbumId: number):Observable<any>{
    const formData = new FormData();
    formData.append('commentBody', myBody);
    formData.append('albumId', ""+myAlbumId);
    formData.append('userId',""+localStorage.getItem('userId'));

    return this.http.post<any>(this.albumsUrl+"/createComment", formData)
    .pipe(
      tap(_ => console.log('created comment')),
      catchError(this.handleError<Album[]>('postNewComment', []))
    );
  }

  getAlbumsForMyFavorites():Observable<any>{
    return this.http.get<Album[]>(this.albumsUrl+"/userFavorites/"+localStorage.getItem('userId'))
      .pipe(
        tap(_ => console.log('fetched favorite albums')),
        catchError(this.handleError<Album[]>('getFavoriteAlbums', []))
      );
  }

  getIsAlbumInMyFavorites(userId:number, albumId:number):Observable<any>{
    return this.http.get<Album[]>(this.albumsUrl+"/isInUserFavorites/"+userId+"/"+albumId)
      .pipe(
        tap(_ => console.log('fetched favorite albums')),
        catchError(this.handleError<Album[]>('getIsAlbumInMyFavorites', []))
      );
  }

  postFavoriteAlbum(myUserId:number, myAlbumId:number):Observable<any>{
    const requestJson={userId: myUserId, favAlbumId: myAlbumId}

    return this.http.post<any>(this.usersUrl+"/favorites", requestJson)
    .pipe(
      tap(_ => console.log('fetched favorite albums')),
      catchError(this.handleError<any>('postFavoriteAlbum', []))
    );
    //TODO: FINISH THIS METHOD

  }
  
  deleteImageFromAlbum(imageId: Number):Observable<any>{
    
    return this.http.delete<any>(this.albumsUrl + '/delete/' + imageId)
      .pipe(
        tap(_ => console.log('delete success')),
        catchError(this.handleError<Album[]>('failed',[]))
      );
  }

  getDoesAlbumBelongToUser(myUserId: number, myAlbumid:number):Observable<any>{

    return this.http.get<boolean>(this.albumsUrl+"/belongsToUser/"+myUserId+"/"+myAlbumid)
      .pipe(
        tap(_ => console.log('fetched does album belong to user')),
        catchError(this.handleError<boolean>('getDoesAlbumBelongToUser', false))
      );

  }

  addNewTagToAlbum(albumId: number, newAlbumTag: string): Observable<any> {
    const requestUrl = this.albumsUrl + '/createTag/' + albumId;
    return this.http.post<any>(requestUrl, newAlbumTag)
      .pipe(
        tap(_ => console.log('created new tag')),
      );
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
