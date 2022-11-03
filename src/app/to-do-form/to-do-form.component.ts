import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
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
  @Input() category = "work";

  toDoForm = new FormGroup({
    content: new FormControl(''),
    completed: new FormControl('false'),
    category: new FormControl('')
    });

  constructor(
    private toDoService: ToDoService,
    private notificationService: NotificationService

  ) { }

  ngOnInit(): void {
    this.toDoForm.patchValue({
      category: this.category
    });
  }


  onSubmit() {
    // TODO: Use EventEmitter with form value
    //console.warn(this.animalForm.value);
    this.toDoForm.patchValue({
      completed: "false"
    });

    //console.log(this.toDoForm.value as ToDo);

  this.toDoService.createToDo(this.toDoForm.value as ToDo).then((response: any) => {
      //this.addNewAnimal(response);
      this.addNewToDo(response);
      this.toDoForm.reset();
      this.toDoForm.patchValue({
        category: this.category
      });

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
