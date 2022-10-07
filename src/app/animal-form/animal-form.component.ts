import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl  } from '@angular/forms';
import { AnimalsService } from '../animals.service';
import { Animal } from '../animal';

@Component({
  selector: 'app-animal-form',
  templateUrl: './animal-form.component.html',
  styleUrls: ['./animal-form.component.css']
})
export class AnimalFormComponent implements OnInit {
  animalForm = new FormGroup({
    name: new FormControl('')
    });

  constructor(
    private animalService: AnimalsService
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.animalForm.value);

  this.animalService.createAnimal(this.animalForm.value.name).then((response: any) => {
      
    });
  }

}
