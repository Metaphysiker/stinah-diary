import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
declare const localforage: any;
import { Entry } from './entry';
import { File } from './file';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(
    private http: HttpClient

  ) { }

  createFile(data: any){
    return new Promise(function(final_resolve, final_reject){

      //console.log("data: " + data);

      let body = new URLSearchParams();
      for (const key in data) {
        body.set(key, data[key]);
        //console.log(`${key} -> ${data[key]}`)
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

        fetch('/secure/files', {
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

  getSignedUrl(key: any){

    let body = new URLSearchParams();
    body.set("key", key);
    //for (const key in data) {
    //  body.set(key, data[key]);
      //console.log(`${key} -> ${data[key]}`)
    //}

    return new Promise(function(final_resolve, final_reject){

      localforage.getItem("jwt-token")
      .then((jwt_token: any) => {

        fetch('/secure/files/get_signed_url', {
          method: "POST",
          headers: {
            'Authorization': 'JWT ' +jwt_token,
          //  'Content-Type': 'multipart/form-data'
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

}
