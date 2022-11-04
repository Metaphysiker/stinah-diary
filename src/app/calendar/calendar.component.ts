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

  weeks: any[] = [];
  all_days: Date[] = [];
  selected_date: any = null;


  today_date = new Date();
  //today_date = new Date(Date.UTC(Year, Month, Day, Hour, Minute, Second));

  firstDayOfMonth = new Date(this.today_date.getFullYear(), this.today_date.getMonth(), 1);
  lastDayOfMonth = new Date(this.today_date.getFullYear(), this.today_date.getMonth() + 1, 0);

  firstDay: any;
  lastDay: any;

  entries: Entry[] = [];
  date = new FormControl('');

  constructor(
    private entryService: EntryService
  ) { }

  ngOnInit(): void {
    console.log("datings:")
    console.log(this.firstDayOfMonth);
    console.log(this.lastDayOfMonth);


    this.firstDay = this.getFirstDayOfWeek(this.firstDayOfMonth);
    this.lastDay = this.getLastDayOfWeek(this.lastDayOfMonth);
    console.log("edge dates: ")
    console.log(this.firstDay);
    console.log(this.lastDay);
    console.log("out");
    this.fillCalendarWithDates();
    this.fillWeeks();


    this.date.setValue(new Date().toLocaleDateString('en-CA'));
    this.getEntriesByDate();
  }

  getEntriesByDate(){

    this.entryService.getEntriesByDate(this.date.value)
    .then((data: any) => {
      this.entries = data;
    });


  }

  getFirstDayOfWeek(d: any) {
    const date = new Date(d);
    const day = date.getDay();
    const diff = date.getDate() - day + 1;

    return new Date(date.setDate(diff));
  }

  getLastDayOfWeek(d: any) {
    const date = new Date(d);
    const day = date.getDay();
    const diff = date.getDate() - day + 7;

    return new Date(date.setDate(diff));
  }

  fillCalendarWithDates(){
    let loop = new Date(this.firstDay);
    while (loop <= this.lastDay) {
      console.log(loop);
      this.all_days.push(loop);
      let newDate = loop.setDate(loop.getDate() + 1);

      loop = new Date(newDate);
    }
  }

  fillWeeks(){

    var week = [];

    for (let i = 0; i < this.all_days.length; i++) {

      week.push(this.all_days[i]);
      if(((i + 1) % 7)==0){
        this.weeks.push(week);
        week = [];
      }
    }

  }

  selectDate(date: any){
    this.selected_date = date;
  }

}
