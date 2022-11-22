import { Component, OnInit, Input } from '@angular/core';
import { Entry } from '../entry';
import { EntryService } from '../entry.service';

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.css']
})
export class EntryComponent implements OnInit {

  showEntry: boolean = true;

  entry: Entry = {
    collection_name: "entries",
    content: "",
    createdAt: new Date(),
    updatedAt: new Date()
  };
  @Input() input_entry_id = 0;

  @Input() show_animal_name = true;

  constructor(
    private entryService: EntryService
  ) { }

  ngOnInit(): void {
    this.getEntry();
  }

  getEntry(){
    this.entryService.getEntry(this.input_entry_id)
    .then((data: any) => {
      //console.log(data);
      this.entry = data;
      //console.log(data);
    });
  }

  deleteEntry(){
    if(confirm("Bist du sicher?")) {
      this.entryService.deleteEntry(this.input_entry_id)
      .then((data: any) => {
        //console.log(data);
        this.showEntry = false;
      });
    }
  }

}
