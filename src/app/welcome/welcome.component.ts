import { Component, OnInit } from '@angular/core';
import { LocalforageService } from '../localforage.service';
declare const localforage: any;

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  show_login: String = "unclear";

  constructor() { }

  ngOnInit(): void {
    localforage.getItem("jwt-token")
    .then((response: any) => {
      if(response == null){
        this.show_login = "yes";
      } else if (response.length === 0){
        this.show_login = "yes";
      } else {
        this.show_login = "no";
      }
    });
  }

}
