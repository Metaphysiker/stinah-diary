import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { LocalforageService } from '../localforage.service';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

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

  constructor(
    private localforageService: LocalforageService,
    private http: HttpClient) { }

  ngOnInit(): void {
  }

  login(){

    let body = new URLSearchParams();
    body.set('email', "username");
    body.set('password', "password");


    //const data = { email: 'fmyxemail@me.com1', password: "password123" };

fetch('/signup', {
  method: 'POST', // or 'PUT'
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  body: body,
})
  .then((response) => response.json())
  .then((data) => {
    console.log('Success:', data);
  })
  .catch((error) => {
    console.log(error);
    console.error('Error:');
  });


  //  this.addHero({ "email": 'example2@example.com', "password": 'password' }).subscribe((response: any) => {
  //    console.log(response);
  //  });

  }

  addHero(hero: any): Observable<any> {
    let url = "http://localhost:3000/signup";
    let httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })
    };

    return this.http.post<any>(url, hero, httpOptions);
  }

}
