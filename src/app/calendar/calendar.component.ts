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

    this.all_days = [];
    this.entries = [];
    this.weeks = [];

    this.getEntriesForCalendar()
    .then((data) => {
      this.setDaysForCalendar()
    })
    .then((days) => {
      this.fillWeeks();
    })
    .then(() => {
      this.markDaysWithEntries()
    });

    //this.setDaysForCalendar();

    //this.fillWeeks();
  }


  getEntriesForCalendar(){

    var self = this;

    return new Promise(function(final_resolve, final_reject){

      self.entryService.getEntriesForCalendar(self.selected_date.toUTCString())
      .then((data: any) => {
        self.entries = data;
        final_resolve(data);
      });

    })

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
      //console.log(loop);
      this.all_days.push(loop);
      let newDate = loop.setDate(loop.getDate() + 1);

      loop = new Date(newDate);
    }
  }

  fillWeeks(){

    var self = this;

    var week: any = [];

    return new Promise(function(final_resolve, final_reject){

      for (let i = 0; i < self.all_days.length; i++) {

        var calendar_date = {
          date: self.all_days[i],
          entries_exist: false
        }

        week.push(calendar_date);

        if(((i + 1) % 7)==0){
          self.weeks.push(week);
          week = [];
        }

        if((i+1) < self.all_days.length){
          final_resolve("");
        }

      }

    })


  }

  markDaysWithEntries(){
    for (let i = 0; i < this.weeks.length; i++) {

      for (let i2 = 0; i2 < this.weeks[i].length; i2++) {
        this.checkIfEntryExistsOnThisDate(this.weeks[i][i2].date)
        .then((boolean: any) => {
            this.weeks[i][i2].entries_exist = boolean;
        })
      }

    }
  }

  checkIfEntryExistsOnThisDate(date: any){
    var self = this;

    return new Promise(function(final_resolve, final_reject){

      for (let i = 0; i < self.entries.length; i++) {

        if (
            self.entries[i]?.createdAt?.getUTCMonth() === date.getUTCMonth() &&
            self.entries[i]?.createdAt?.getUTCDate() === date.getUTCDate()
          ){
            //console.log("TRUUUUUUUUUUUUUUUUU");
            final_resolve(true);
          } else {
            if((i+1) <= self.entries.length ){
              //console.log("FAAAAALSE");

              setTimeout(function(){
                final_resolve(false);
              }, 5000);

            }
          }

      }

    })

  }

  setDaysForCalendar(){

    var self = this;

    return new Promise(function(final_resolve, final_reject){
      self.firstDayOfMonth = new Date(self.selected_date.getFullYear(), self.selected_date.getMonth(), 1);
      self.lastDayOfMonth = new Date(self.selected_date.getFullYear(), self.selected_date.getMonth() + 1, 0);

      self.firstDay = self.getFirstDayOfWeek(self.firstDayOfMonth);
      self.lastDay = self.getLastDayOfWeek(self.lastDayOfMonth);
      final_resolve("");

      let loop = new Date(self.firstDay);

      while (loop <= self.lastDay) {

        self.all_days.push(loop);

        let newDate = loop.setDate(loop.getDate() + 1);

        loop = new Date(newDate);

        if(newDate <= self.lastDay){
          final_resolve("");
        }

      }

    })

  }

  getPreviousMonth(){
    this.selected_date = new Date(Date.UTC(this.selected_date.getFullYear(), this.selected_date.getMonth()-1,1));
    this.loadCalendar();
  }

  getNextMonth(){
    this.selected_date = new Date(Date.UTC(this.selected_date.getFullYear(), this.selected_date.getMonth()+1,1));
    this.loadCalendar();
  }

  selectDate(date: any){
    this.selected_date = date;
  }

}
