import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { AnimalsService } from '../animals.service';
import { Animal } from '../animal';
import { Entry } from '../entry';

@Component({
  selector: 'app-animal',
  templateUrl: './animal.component.html',
  styleUrls: ['./animal.component.css']
})
export class AnimalComponent implements OnInit {

  showAnimal: boolean = true;
  //animal$: Observable<any>;
  animal_id: any;
  animal: Animal | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private animalService: AnimalsService
  ) { }

  ngOnInit(): void {
    //const animalId = this.route.snapshot.paramMap.get('id');
    //this.animal$ = this.animalService.getAnimal(animalId);

    this.animal_id = this.route.snapshot.paramMap.get('id');
    this.animalService.getAnimal(this.animal_id)
    .then((data: any) => {
      this.animal = data;
    });

  }

  reload(entry: Entry){
    console.log("reload");
  }

  deleteAnimal(){
    if(this.animal){
      if(confirm("Bist du sicher?")) {
        this.animalService.deleteAnimal(this.animal._id)
        .then((data: any) => {
          //console.log(data);
          this.showAnimal = false;
        });
      }
    }

  }

}
