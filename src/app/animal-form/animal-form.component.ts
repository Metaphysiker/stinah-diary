import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl  } from '@angular/forms';
import { AnimalsService } from '../animals.service';
import { Animal } from '../animal';
import { Router } from '@angular/router';


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
    private router: Router
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
    });
  }

  addNewAnimal(animal: Animal) {
    this.newAnimalEvent.emit(animal);
  }

}
