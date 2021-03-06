import { Album } from './../../models/album';

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {

  private albumsUrl = 'api/albums';
  
  constructor(
    private http: HttpClient
  ) { }

  /** GET albums from the server */
  getAlbums(): Observable<Album[]> {
    return this.http.get<Album[]>(this.albumsUrl)
      .pipe(
        tap(_ => console.log('fetched heroes')),
        catchError(this.handleError<Album[]>('getAlbums', []))
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
