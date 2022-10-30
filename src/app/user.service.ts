import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
declare const localforage: any;
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  updateUser(user: User){
    //console.log("service get To Do");

    return new Promise(function(final_resolve, final_reject){

      let body = new URLSearchParams();

      for (const [key, value] of Object.entries(user)) {
        console.log(`${key}: ${value}`);
        body.set(key, value;
      }

      console.log("body");
      console.log(body);


      localforage.getItem("jwt-token")
      .then((jwt_token: any) => {

        fetch('/secure/users', {
          method: "PUT",
          headers: {
            'Authorization': 'JWT ' +jwt_token
          },
          body: body,
        })
        .then((response) => {
          final_resolve(response);
        })
      })
    })
  }

}
