import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl  } from '@angular/forms';
import { AnimalsService } from '../animals.service';
import { Animal } from '../animal';
import { Router } from '@angular/router';
import { NotificationService } from '../notification.service';
import { NotificationMessage } from '../notification-message';



@Component({
  selector: 'app-animal-form',
  templateUrl: './animal-form.component.html',
  styleUrls: ['./animal-form.component.css']
})
export class AnimalFormComponent implements OnInit {
  animalForm = new FormGroup({
    name: new FormControl('')
    });

  @Output() newAnimalEvent = new EventEmitter<Animal>();

  constructor(
    private animalService: AnimalsService,
    private router: Router,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    //console.warn(this.animalForm.value);

  this.animalService.createAnimal(this.animalForm.value.name).then((response: any) => {
      //this.router.navigate(['/animals-overview']);
      this.addNewAnimal(response);
      this.animalForm.reset();
      var notification_message: NotificationMessage = {
              title: "Neues Tier",
              body: response.name
            };
      this.sendNotification(notification_message);
    });
  }

  addNewAnimal(animal: Animal) {
    this.newAnimalEvent.emit(animal);
  }

  sendNotification(notification_message: NotificationMessage){

    this.notificationService.sendNotification(
      notification_message
    );
  }

}
