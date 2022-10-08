import { Component, OnInit, Input } from '@angular/core';
import { Entry } from '../entry';
import { EntryService } from '../entry.service';

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.css']
})
export class EntryComponent implements OnInit {
  entry: Entry = {
    content: "",
    createdAt: new Date(),
    updatedAt: new Date()
  };
  @Input() input_entry_id = 0;

  constructor(
    private entryService: EntryService
  ) { }

  ngOnInit(): void {
    this.getEntry();
  }

  getEntry(){
    this.entryService.getEntry(this.input_entry_id)
    .then((data: any) => {
      console.log(data);
      this.entry = data;
    });
  }

}
