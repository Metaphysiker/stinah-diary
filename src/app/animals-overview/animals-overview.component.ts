import { Component, OnInit } from '@angular/core';
import { AnimalsService } from '../animals.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Animal } from '../animal';

@Component({
  selector: 'app-animals-overview',
  templateUrl: './animals-overview.component.html',
  styleUrls: ['./animals-overview.component.css']
})
export class AnimalsOverviewComponent implements OnInit {

  animals: Animal[] = [];

  constructor(
    private animalService: AnimalsService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    //this.animalService.getAnimals().subscribe((animals: any) => {this.animals = animals});

    this.animalService.getAnimals().then((response: any) => {
      this.animals = response;
    });

    //this.animalService.createAnimal("Heinrich").then((response: any) => {
    //  console.log("create Animal: ");
    //  console.log(response);
    //  console.log(response.name);
    //});
  }


}
