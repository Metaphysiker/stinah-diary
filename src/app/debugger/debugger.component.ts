import { Component, OnInit } from '@angular/core';
declare const localforage: any;


@Component({
  selector: 'app-debugger',
  templateUrl: './debugger.component.html',
  styleUrls: ['./debugger.component.css']
})
export class DebuggerComponent implements OnInit {

  jwt: String = "";

  constructor() { }

  ngOnInit(): void {
    localforage.getItem("jwt-token")
    .then((response: any) => {
      this.jwt = response;
    });
  }

}
