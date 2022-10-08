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

  createEntry(data: any){
    return new Promise(function(final_resolve, final_reject){

      console.log("data: " + data);

      let body = new URLSearchParams();
      for (const key in data) {
        body.set(key, data[key]);
        console.log(`${key} -> ${data[key]}`)
      }

      const formData = new FormData();
      for (const key in data) {
        formData.append(key, data[key]);
      }

      //formData.append("file", new Blob(data.image), "mein-bild.jpg");


      console.log("here is body: ");
      console.log(body);

      localforage.getItem("jwt-token")
      .then((jwt_token: any) => {

        fetch('/secure/entries', {
          method: "POST",
          headers: {
            'Authorization': 'JWT ' +jwt_token,
          //  'Content-Type': 'multipart/form-data'
          },
          body: formData,
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
