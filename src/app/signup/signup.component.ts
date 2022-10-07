import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { LocalforageService } from '../localforage.service';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

declare const localforage: any;

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  email = new FormControl('');
  password = new FormControl('');

  signup_status: String = "";

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  signup(){

    var body_email = "empty";
    var body_password = "empty";

    if(this.email.value != null){
      body_email = this.email.value;
    }

    if(this.password.value != null){
      body_password = this.password.value;
    }

    let body = new URLSearchParams();
    body.set('email', body_email);
    body.set('password', body_password);

    fetch('/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: body,
    })
    .then((response) => {
      if(response.ok){

        response.json()
        .then((data) => {
          localforage.setItem("jwt-token", data.token)
            .then((jwt_token: any) => {
              this.signup_status = "Registrierung war erfolgreich."
              this.router.navigate(['/']);
            })
        })


      } else {
        this.signup_status = "Fehler.";
      }
    })

  }

}
