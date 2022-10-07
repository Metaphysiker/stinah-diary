import { Component, OnInit } from '@angular/core';
import { AnimalsService } from '../animals.service';

@Component({
  selector: 'app-animals-overview',
  templateUrl: './animals-overview.component.html',
  styleUrls: ['./animals-overview.component.css']
})
export class AnimalsOverviewComponent implements OnInit {

  animals: any = "";

  constructor(private animalService: AnimalsService) { }

  ngOnInit(): void {
    //this.animalService.getAnimals().subscribe((animals: any) => {this.animals = animals});

    this.animalService.getAnimals().then((animals: any) => {
      console.log("getAnimals");
      console.log(animals);
      console.log(animals["animals"]);
      this.animals = animals["animals"];
    });


  }



}
