import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl  } from '@angular/forms';
import { ToDo } from '../to-do';
import { ToDoService } from '../to-do.service';
import { NotificationService } from '../notification.service';
import { NotificationMessage } from '../notification-message';

@Component({
  selector: 'app-to-do-form',
  templateUrl: './to-do-form.component.html',
  styleUrls: ['./to-do-form.component.css']
})
export class ToDoFormComponent implements OnInit {
  @Output() newToDoEvent = new EventEmitter<ToDo>();

  toDoForm = new FormGroup({
    content: new FormControl('')
    });

  constructor(
    private toDoService: ToDoService,
    private notificationService: NotificationService

  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    //console.warn(this.animalForm.value);

  this.toDoService.createToDo(this.toDoForm.value as ToDo).then((response: any) => {
      //this.addNewAnimal(response);
      this.addNewToDo(response);
      this.toDoForm.reset();

      var notification_message: NotificationMessage = {
              title: "Neues To-Do",
              body: response.content
            };
      this.sendNotification(notification_message);
    });
  }

  sendNotification(notification_message: NotificationMessage){

    this.notificationService.sendNotification(
      notification_message
    );
  }

  addNewToDo(toDo: ToDo) {
    this.newToDoEvent.emit(toDo);
  }

}
