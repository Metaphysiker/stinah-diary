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

  getEntry(id: Number){
    return new Promise(function(final_resolve, final_reject){

      localforage.getItem("jwt-token")
      .then((jwt_token: any) => {

        fetch('/secure/entries/' + id, {
          headers: {
            'Authorization': 'JWT ' +jwt_token
          }
        })
        .then((response) => response.json())
        .then((data: any) => {
          data.updatedAt = new Date(data.updatedAt);
          data.createdAt = new Date(data.createdAt);

          //console.log("entry_data");
          //console.log(data);
          final_resolve(data);
        });
      })
    })
  }

  deleteEntry(id: Number){
    return new Promise(function(final_resolve, final_reject){

      localforage.getItem("jwt-token")
      .then((jwt_token: any) => {

        fetch('/secure/entries/' + id, {
          method: "DELETE",
          headers: {
            'Authorization': 'JWT ' +jwt_token
          }
        })
        .then((response) => response.json())
        .then((data: any) => {


          final_resolve("entry deleted");
        });
      })
    })
  }

  createEntry(data: any){
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


      //console.log("here is body: ");
      //console.log(body);

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

  getEntriesByDate(date: any){
    return new Promise(function(final_resolve, final_reject){

      localforage.getItem("jwt-token")
      .then((jwt_token: any) => {

        fetch('/secure/entries/date/' + date, {
          headers: {
            'Authorization': 'JWT ' +jwt_token
          }
        })
        .then((response) => response.json())
        .then((data: any) => {
          for (let i = 0; i < data.length; i++) {
            data[i].updatedAt = new Date(data[i].updatedAt);
            data[i].createdAt = new Date(data[i].createdAt);
          }

          final_resolve(data);
        });
      })
    })
  }

  getEntriesForCalendar(date: any){
    return new Promise(function(final_resolve, final_reject){

      localforage.getItem("jwt-token")
      .then((jwt_token: any) => {

        fetch('/secure/entries/calendar/' + date, {
          headers: {
            'Authorization': 'JWT ' +jwt_token
          }
        })
        .then((response) => response.json())
        .then((data: any) => {
          for (let i = 0; i < data.length; i++) {
            data[i].updatedAt = new Date(data[i].updatedAt);
            data[i].createdAt = new Date(data[i].createdAt);
          }

          final_resolve(data);
        });
      })
    })
  }

  getEntriesOfAnimal(animal_id: any){
    return new Promise(function(final_resolve, final_reject){

      localforage.getItem("jwt-token")
      .then((jwt_token: any) => {

        fetch('/secure/entries/animal/' + animal_id, {
          headers: {
            'Authorization': 'JWT ' +jwt_token
          }
        })
        .then((response) => response.json())
        .then((data: any) => {
          for (let i = 0; i < data.length; i++) {
            data[i].updatedAt = new Date(data[i].updatedAt);
            data[i].createdAt = new Date(data[i].createdAt);
          }

          final_resolve(data);
        });
      })
    })
  }

  searchEntries(search_string: string){
    return new Promise(function(final_resolve, final_reject){

      localforage.getItem("jwt-token")
      .then((jwt_token: any) => {

        fetch('/secure/entries/search/' + search_string, {
          headers: {
            'Authorization': 'JWT ' +jwt_token
          }
        })
        .then((response) => response.json())
        .then((data: any) => {
          for (let i = 0; i < data.length; i++) {
            data[i].updatedAt = new Date(data[i].updatedAt);
            data[i].createdAt = new Date(data[i].createdAt);
          }

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
