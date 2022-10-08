import { Component, OnInit, Input } from '@angular/core';
import { AnimalsService } from '../animals.service';
import { Animal } from '../animal';
import { Entry } from '../entry';

@Component({
  selector: 'app-entries',
  templateUrl: './entries.component.html',
  styleUrls: ['./entries.component.css']
})
export class EntriesComponent implements OnInit {

  @Input() input_animal_id = 0;
  @Input() entries: any[] = [];
  @Input() animal: Animal = {
    name: "",
    _id: 0
  };

  constructor(
    private animalsService: AnimalsService
  ) { }

  ngOnInit(): void {
  }

  addEntry(entry: Entry){
    this.animalsService.getAnimal(this.animal._id)
    .then((data: any) => {
      this.animal = data;
    });
  }

}
