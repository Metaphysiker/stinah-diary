import { Component, OnInit, Input } from '@angular/core';
declare const localforage: any;

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent implements OnInit {

  @Input() image_url: String = "";

  final_image_url: String = "";

  constructor() { }

  ngOnInit(): void {

    localforage.getItem("jwt-token")
    .then((jwt_token: any) => {
      this.final_image_url = "/uploads/" + this.image_url + "?jwt-token=" + jwt_token;
    })
  }

}
