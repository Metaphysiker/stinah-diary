import { Component, OnInit } from '@angular/core';
import { SwPush } from "@angular/service-worker";
import { NotificationService } from '../notification.service';

@Component({
  selector: 'app-notification-setting',
  templateUrl: './notification-setting.component.html',
  styleUrls: ['./notification-setting.component.css']
})
export class NotificationSettingComponent implements OnInit {
  notification_status: Boolean = false;

  constructor(
    private _swPush: SwPush,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {

  }

  sendNotification(){
    this.notificationService.sendNotification();
  }

  requestSubscription = () => {
    //this.requestSubscription();
    if (!this._swPush.isEnabled) {
      this.notification_status = this._swPush.isEnabled;
      console.log("Notification is not enabled.");
      return;
    } else {
      this.notification_status = this._swPush.isEnabled;
    }

    console.log("angular request subscription");
    this._swPush.requestSubscription({
      serverPublicKey: 'BB7sJU7TwcojFmgEH9WBNg_OypktnrVro38LSrL_wJHT1oWrh3k_8tw4jcTUVYYSRh-e8BuOLnoKlGVtJSAX2Mc'
    }).then((subscription) => {

      const subscription_string = JSON.stringify(subscription);
      this.notificationService.saveSubscription(JSON.parse(subscription_string));
    }).catch((_) => console.log);
  };

}
