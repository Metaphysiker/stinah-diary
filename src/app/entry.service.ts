import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
declare const localforage: any;

@Injectable({
  providedIn: 'root'
})
export class EntryService {

  constructor(
    private http: HttpClient
  ) { }

  createEntry(content: any){
    return new Promise(function(final_resolve, final_reject){

      let body = new URLSearchParams();
      body.set('content', content);

      localforage.getItem("jwt-token")
      .then((jwt_token: any) => {

        fetch('/secure/entries', {
          method: "POST",
          headers: {
            'Authorization': 'JWT ' +jwt_token
          },
          body: body,
        })
        .then((response) => response.json())
        .then((data) => {
            final_resolve(data);
        });
      })
    })
  }

  getJwtToken(){
    localforage.getItem("jwt-token")
    .then((jwt_token: any) => {
      return jwt_token;
    })
  }

}
