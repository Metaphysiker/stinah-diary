import { Component, OnInit, Input } from '@angular/core';
import { AnimalsService } from '../animals.service';
import { EntryService } from '../entry.service';
import { Animal } from '../animal';
import { Entry } from '../entry';

@Component({
  selector: 'app-entries',
  templateUrl: './entries.component.html',
  styleUrls: ['./entries.component.css']
})
export class EntriesComponent implements OnInit {

  @Input() show_animal_name = true;

  @Input() input_entry_id = 0;
  entries: Entry[] = [];
  @Input() animal: Animal = {
    name: "",
    _id: 0
  };

  constructor(
    private animalsService: AnimalsService,
    private entryService: EntryService
  ) { }

  ngOnInit(): void {
    this.getEntries();
  }

  addEntry(entry: Entry){
    //this.getEntries();
    this.entries.unshift(entry);
  }

  getEntries(){
    this.entryService.getEntriesOfAnimal(this.animal._id)
    .then((data: any) => {
      this.entries = data;
    });
  }

}
