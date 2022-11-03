import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ToDo } from '../to-do';
import { ToDoService } from '../to-do.service';

@Component({
  selector: 'app-to-dos',
  templateUrl: './to-dos.component.html',
  styleUrls: ['./to-dos.component.css']
})
export class ToDosComponent implements OnInit {
  toDos: ToDo[] = [];
  category: string = "work";
  category_translated: string = "To-Do";

  uncompletedToDos: ToDo[] = [];
  completedToDos: ToDo[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private toDoService: ToDoService,
  ) { }

  ngOnInit(): void {

    this.route.params.subscribe(params => {

      if(this.route.snapshot.paramMap.get('category')){
        this.category = this.route.snapshot.paramMap.get('category') as string;
        this.getToDosByCategory();
        this.category_translated = this.translateCategory(this.category);
      } else {
        this.getToDosByCategory();
        this.category_translated = this.translateCategory(this.category);
      }
      
    });


    //this.category = this.route.snapshot.paramMap.get('category');

  }

  getToDosByCategory(){
    this.toDoService.getToDosByCategory(this.category)
    .then((data: any) => {
      this.toDos = data;
      this.uncompletedToDos = this.toDos.filter(function(to_do) { return to_do.completed === 'false'; });
      this.completedToDos = this.toDos.filter(function(to_do) { return to_do.completed === 'true'; });
    });
  }

  addToDo(toDo: ToDo){
    this.toDos.unshift(toDo);
    this.uncompletedToDos = this.toDos.filter(function(to_do) { return to_do.completed === 'false'; });
    this.completedToDos = this.toDos.filter(function(to_do) { return to_do.completed === 'true'; });
  }

  translateCategory(category: string){
    var result = "";
    switch(category) {
      case "vet":
        result = "Arzt";
        break;
      case "shop":
        // code block
        result = "Einkaufen";
        break;
      case "work":
        // code block
        result = "To-Do";
        break;
      default:
        result: "To-Do";
    }
    return result;
  }

}
