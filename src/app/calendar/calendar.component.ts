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

  //today_date = new Date();
  selected_date = new Date();
  //today_date = new Date(Date.UTC(Year, Month, Day, Hour, Minute, Second));

  firstDayOfMonth: any;
  lastDayOfMonth: any;

  firstDay: any;
  lastDay: any;

  entries: Entry[] = [];
  date = new FormControl('');

  constructor(
    private entryService: EntryService
  ) { }

  ngOnInit(): void {

    this.date.setValue(new Date().toLocaleDateString('en-CA'));
    this.loadCalendar();
  }

  loadCalendar(){
    this.setDaysForCalendar();
    this.getEntriesForCalendar();
    this.fillWeeks();
  }


  getEntriesForCalendar(){

    this.entryService.getEntriesForCalendar(this.selected_date.toUTCString())
    .then((data: any) => {
      this.entries = data;
    });


  }

  getFirstDayOfWeek(d: any) {
    const date = new Date(d);
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1);

    return new Date(date.setDate(diff));
  }

  getLastDayOfWeek(d: any) {
    const date = new Date(d);
    const day = date.getDay();
    const diff = date.getDate() - day + 7;

    return new Date(date.setDate(diff));
  }

  fillCalendarWithDates(){
    this.all_days = [];
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

  setDaysForCalendar(){

    this.firstDayOfMonth = new Date(this.selected_date.getFullYear(), this.selected_date.getMonth(), 1);
    this.lastDayOfMonth = new Date(this.selected_date.getFullYear(), this.selected_date.getMonth() + 1, 0);

    this.firstDay = this.getFirstDayOfWeek(this.firstDayOfMonth);
    this.lastDay = this.getLastDayOfWeek(this.lastDayOfMonth);

    this.all_days = [];
    this.weeks = [];
    let loop = new Date(this.firstDay);
    while (loop <= this.lastDay) {
      console.log(loop);
      this.all_days.push(loop);
      let newDate = loop.setDate(loop.getDate() + 1);

      loop = new Date(newDate);
    }


  }

  getPreviousMonth(){
    console.log("previous");
    this.selected_date = new Date(Date.UTC(this.selected_date.getFullYear(), this.selected_date.getMonth()-1,1));
    this.loadCalendar();
  }

  getNextMonth(){
    console.log("next");
    this.selected_date = new Date(Date.UTC(this.selected_date.getFullYear(), this.selected_date.getMonth()+1,1));
    this.loadCalendar();
  }

  selectDate(date: any){
    this.selected_date = date;
  }

}
