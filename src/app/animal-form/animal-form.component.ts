import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl  } from '@angular/forms';

@Component({
  selector: 'app-animal-form',
  templateUrl: './animal-form.component.html',
  styleUrls: ['./animal-form.component.css']
})
export class AnimalFormComponent implements OnInit {
  animalForm = new FormGroup({
    name: new FormControl('')
    });

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.animalForm.value);
  }

}
