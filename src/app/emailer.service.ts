import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
declare const localforage: any;

@Injectable({
  providedIn: 'root'
})
export class EmailerService {

  constructor(
    private http: HttpClient
  ) { }


  sendEmail(_id: any){
    //console.log("service get To Do");

    return new Promise(function(final_resolve, final_reject){

      localforage.getItem("jwt-token")
      .then((jwt_token: any) => {

        fetch('/secure/emailer/' + _id, {
          headers: {
            'Authorization': 'JWT ' +jwt_token
          }
        })
        .then((response) => {
          final_resolve(response);
        })
      })
    })
  }

  sendTestEmail(){
    //console.log("service get To Do");

    return new Promise(function(final_resolve, final_reject){

      localforage.getItem("jwt-token")
      .then((jwt_token: any) => {

        fetch('/secure/emailer/send_test_email', {
          headers: {
            'Authorization': 'JWT ' +jwt_token
          }
        })
        .then((response) => {
          final_resolve(response);
        })
      })
    })
  }

  sendDailyUpdateEmails(){
    //console.log("service get To Do");

    return new Promise(function(final_resolve, final_reject){

      localforage.getItem("jwt-token")
      .then((jwt_token: any) => {

        fetch('/secure/emailer/daily_update', {
          headers: {
            'Authorization': 'JWT ' +jwt_token
          }
        })
        .then((response) => {
          final_resolve(response);
        })
      })
    })
  }

}
