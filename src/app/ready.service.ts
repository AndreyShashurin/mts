import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ReadyService {

  private jsonURL = 'assets/data.json';

  constructor(private http: HttpClient) {}

  getJSON()  { 
    const sortByType = function(data) {
      data.tree.forEach((element) => {
        element.children.sort((a) => {
          return a.type == 'folder' ? -1: 0
        });
      });
    };
    return this.http.get(this.jsonURL).pipe(
      tap(sortByType)
    )
  }
}
