import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { AnimalsService } from '../animals.service';

@Component({
  selector: 'app-animal',
  templateUrl: './animal.component.html',
  styleUrls: ['./animal.component.css']
})
export class AnimalComponent implements OnInit {

  //animal$: Observable<any>;
  animal_id: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private animalService: AnimalsService
  ) { }

  ngOnInit(): void {
    //const animalId = this.route.snapshot.paramMap.get('id');
    //this.animal$ = this.animalService.getAnimal(animalId);

    this.animal_id = this.route.snapshot.paramMap.get('id');
  }

}
