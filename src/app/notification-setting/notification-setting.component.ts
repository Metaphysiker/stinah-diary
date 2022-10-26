import { Component, OnInit } from '@angular/core';
import { SwPush } from "@angular/service-worker";


@Component({
  selector: 'app-notification-setting',
  templateUrl: './notification-setting.component.html',
  styleUrls: ['./notification-setting.component.css']
})
export class NotificationSettingComponent implements OnInit {
  notification_status: Boolean = false;

  constructor(
    private _swPush: SwPush
  ) { }

  ngOnInit(): void {
    //this.requestSubscription();
  }

  requestSubscription = () => {
    if (!this._swPush.isEnabled) {
      this.notification_status = this._swPush.isEnabled;
      console.log("Notification is not enabled.");
      return;
    } else {
      this.notification_status = this._swPush.isEnabled;
    }

    this._swPush.requestSubscription({
      serverPublicKey: 'BB7sJU7TwcojFmgEH9WBNg_OypktnrVro38LSrL_wJHT1oWrh3k_8tw4jcTUVYYSRh-e8BuOLnoKlGVtJSAX2Mc'
    }).then((_) => {
      console.log(JSON.stringify(_));
    }).catch((_) => console.log);
  };

}
