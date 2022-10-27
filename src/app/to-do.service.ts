import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
declare const localforage: any;
import { ToDo } from './to-do';


@Injectable({
  providedIn: 'root'
})
export class ToDoService {

  constructor(
    private http: HttpClient
  ) { }

  createToDo(toDo: ToDo){
    return new Promise(function(final_resolve, final_reject){

      let body = new URLSearchParams();
      body.set('content', toDo.content);
      body.set('completed', toDo.completed);

      localforage.getItem("jwt-token")
      .then((jwt_token: any) => {

        fetch('/secure/to_dos', {
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

  updateToDo(toDo: ToDo){
    console.log(toDo);
    return new Promise(function(final_resolve, final_reject){

      let body = new URLSearchParams();
      body.set('content', toDo.content);
      body.set('completed', toDo.completed);

      localforage.getItem("jwt-token")
      .then((jwt_token: any) => {

        fetch('/secure/to_dos/' + toDo._id, {
          method: "PUT",
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

  getToDo(_id: any){
    //console.log("service get To Do");

    return new Promise(function(final_resolve, final_reject){

      localforage.getItem("jwt-token")
      .then((jwt_token: any) => {

        fetch('/secure/to_dos/' + _id, {
          headers: {
            'Authorization': 'JWT ' +jwt_token
          }
        })
        .then((response) => response.json())
        .then((data: any) => {
          data.updatedAt = new Date(data.updatedAt);
          data.createdAt = new Date(data.createdAt);
          final_resolve(data);
        });
      })
    })
  }


  getToDos(){

    return new Promise(function(final_resolve, final_reject){

      localforage.getItem("jwt-token")
      .then((jwt_token: any) => {

        fetch('/secure/to_dos', {
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

          for (let i = 0; i < data.entries.length; i++) {
            data.entries[i].updatedAt = new Date(data.entries[i].updatedAt);
            data.entries[i].createdAt = new Date(data.entries[i].createdAt);
          }

          final_resolve(data);
        });
      })
    })
  }

  deleteToDo(id: any){
    return new Promise(function(final_resolve, final_reject){

      localforage.getItem("jwt-token")
      .then((jwt_token: any) => {

        fetch('/secure/to_dos/' + id, {
          method: "DELETE",
          headers: {
            'Authorization': 'JWT ' +jwt_token
          }
        })
        .then((response) => response.json())
        .then((data: any) => {


          final_resolve("toDo deleted");
        });
      })
    })
  }


}
