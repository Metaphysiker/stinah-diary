import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl  } from '@angular/forms';
import { EntryService } from '../entry.service';
import { Entry } from '../entry';
import { Animal } from '../animal';
import { NotificationService } from '../notification.service';
import { NotificationMessage } from '../notification-message';


@Component({
  selector: 'app-entry-form',
  templateUrl: './entry-form.component.html',
  styleUrls: ['./entry-form.component.css']
})
export class EntryFormComponent implements OnInit {

  pleaseWait: boolean = false;

  @Input() animal: Animal = {
      name: "",
      _id: 0
    };

  @Output() newEntryEvent = new EventEmitter<Entry>();

  entryForm = new FormGroup({
    content: new FormControl(''),
    animal_id: new FormControl(0),
    image: new FormControl(''),
    file: new FormControl('')
    });

  constructor(
    private entryService: EntryService,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {

  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    //console.log("onSubmit");
    //console.log(this.entryForm.value.image);
    //console.log(this.entryForm.value.image.target.files[0]);

    this.pleaseWait = true;


    this.entryForm.patchValue({
      animal_id: this.animal._id
    });
    //console.warn(this.entryForm.value);

  this.entryService.createEntry(this.entryForm.value).then((response: any) => {
      //this.router.navigate(['/animals-overview']);
      //console.log(response);
      this.addNewEntry(response);
      this.pleaseWait = false;
      this.entryForm.reset();
      var notification_message: NotificationMessage = {
              title: response.animal.name,
              body: response.content
            };
      this.sendNotification(notification_message);
    });
  }

  addNewEntry(entry: Entry) {
    this.newEntryEvent.emit(entry);
  }

  onFileChange(event: any) {

    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.entryForm.patchValue({
        image: file
      });
    }
  }

  sendNotification(notification_message: NotificationMessage){

    this.notificationService.sendNotification(
      notification_message
    );
  }

}
