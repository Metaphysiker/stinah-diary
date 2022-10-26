import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
declare const localforage: any;

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(
    private http: HttpClient
  ) { }

  sendNotification(){
    return new Promise(function(final_resolve, final_reject){

      let body = new URLSearchParams();
      body.set('title', "Mein Titel");
      body.set('body', "Mein Body");


      localforage.getItem("jwt-token")
      .then((jwt_token: any) => {

        fetch('/secure/notifications/send_notification', {
          method: "POST",
          headers: {
            'Authorization': 'JWT ' +jwt_token
          },
          body: body,
        })
        .then((response) => {
          final_resolve("");
        });
      })
    })
  }

  saveSubscription(subscription: any){
    return new Promise(function(final_resolve, final_reject){
      console.log(subscription);

      let body = new URLSearchParams();
      body.set('endpoint', subscription.endpoint);
      body.set('auth', subscription.keys.auth);
      body.set('p256dh', subscription.keys.p256dh);



      localforage.getItem("jwt-token")
      .then((jwt_token: any) => {

        fetch('/secure/notification_subscriptions', {
          method: "POST",
          headers: {
            'Authorization': 'JWT ' +jwt_token
          },
          body: body,
        })
        .then((response) => {
          final_resolve("");
        });
      })
    })
  }

}
