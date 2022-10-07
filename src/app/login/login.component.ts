import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { LocalforageService } from '../localforage.service';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
declare const localforage: any;

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    Authorization: 'my-auth-token'
  })
};

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email = new FormControl('');
  password = new FormControl('');

  login_status: String = "Nicht angemeldet."

  constructor(
    private localforageService: LocalforageService,
    private http: HttpClient) { }

  ngOnInit(): void {
  }

  login(){

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

    fetch('/login', {
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
              this.login_status = "Anmeldung war erfolgreich."
            })
        })


      } else {
        this.login_status = "Falsche Zugangsdaten oder Fehler.";
      }
    })

  }

  loginAttempt(hero: any): Observable<any> {
    let url = "http://localhost:3000/signup";
    let httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })
    };

    return this.http.post<any>(url, hero, httpOptions);
  }

  addHero(hero: any): Observable<any> {
    let url = "http://localhost:3000/signup";
    let httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })
    };

    return this.http.post<any>(url, hero, httpOptions);
  }

}
