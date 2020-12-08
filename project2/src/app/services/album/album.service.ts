import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {

  private albumsUrl = 'api/albums';
  
  constructor(
    private http: HttpClient
  ) { }


}
