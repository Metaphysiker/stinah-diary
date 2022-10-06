import { Component, OnInit } from '@angular/core';
import { LocalforageService } from '../localforage.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  constructor(private localforageService: LocalforageService) { }

  ngOnInit(): void {
    this.localforageService.getItem("test")
      .then((response: any) => {
        console.log(response);
      })

  }

}
