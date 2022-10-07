import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
declare const localforage: any;

@Injectable({
  providedIn: 'root'
})
export class AnimalsService {

  constructor(private http: HttpClient) { }

  getAnimal(id: Number){
    return new Promise(function(final_resolve, final_reject){
      console.log("get animal id: ");
      console.log(id);
      console.log('/secure/animals/' + id);
      localforage.getItem("jwt-token")
      .then((jwt_token: any) => {

        fetch('/secure/animals/' + id, {
          headers: {
            'Authorization': 'JWT ' +jwt_token
          }
        })
        .then((response) => response.json())
        .then((data: any) => {
          final_resolve(data);
        });
      })
    })
  }

  getAnimals(){

    return new Promise(function(final_resolve, final_reject){

      localforage.getItem("jwt-token")
      .then((jwt_token: any) => {

        fetch('/secure/animals', {
          headers: {
            'Authorization': 'JWT ' +jwt_token
          }
        })
        .then((response) => response.json())
        .then((data: any) => {
          final_resolve(data);
        });
      })
    })
  }

  createAnimal(name: any){
    return new Promise(function(final_resolve, final_reject){

      console.log("createAnimal start");

      let body = new URLSearchParams();
      body.set('name', name);

      localforage.getItem("jwt-token")
      .then((jwt_token: any) => {

        fetch('/secure/animals', {
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
