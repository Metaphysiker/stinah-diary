import { Component, OnInit } from '@angular/core';
import { Entry } from '../entry';
import { EntryService } from '../entry.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  entries: Entry[] = [];
  date = new FormControl('');

  constructor(
    private entryService: EntryService
  ) { }

  ngOnInit(): void {
    this.date.setValue(new Date().toLocaleDateString('en-CA'));
    this.getEntriesByDate();
  }

  getEntriesByDate(){

    this.entryService.getEntriesByDate(this.date.value)
    .then((data: any) => {
      this.entries = data;
    });


  }

}
