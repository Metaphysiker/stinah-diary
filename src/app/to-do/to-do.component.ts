import { Component, OnInit, Input } from '@angular/core';
import { ToDo } from '../to-do';
import { ToDoService } from '../to-do.service';
import { NotificationService } from '../notification.service';
import { NotificationMessage } from '../notification-message';

@Component({
  selector: 'app-to-do',
  templateUrl: './to-do.component.html',
  styleUrls: ['./to-do.component.css']
})
export class ToDoComponent implements OnInit {

  showToDo: boolean = true;

  @Input() input_to_do_id = "0";

  toDo: ToDo = {
    content: "",
    completed: "",
    category: "",
    _id: "0"
  };

  constructor(
    private toDoService: ToDoService,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.getToDo();
  }

  getToDo(){

    this.toDoService.getToDo(this.input_to_do_id)
    .then((data: any) => {
      //console.log(data);
      this.toDo = data;
    });
  }

  checkToDo(){
    this.toDo.completed = 'true';

    this.toDoService.updateToDo(this.toDo).then((response: any) => {

        var notification_message: NotificationMessage = {
                title: "To-Do erledigt",
                body: response.content
              };
        this.sendNotification(notification_message);
      });
  }

  unCheckToDo(){
    this.toDo.completed = 'false';

    this.toDoService.updateToDo(this.toDo).then((response: any) => {

      });
  }

  deleteToDo(){

    if(confirm("Bist du sicher?")) {
      this.toDoService.deleteToDo(this.toDo._id)
      .then((data: any) => {
        //console.log(data);
        this.showToDo = false;
      });
    }
  }

  sendNotification(notification_message: NotificationMessage){
    console.log("angular send notification");
    this.notificationService.sendNotification(
      notification_message
    );
  }

}
