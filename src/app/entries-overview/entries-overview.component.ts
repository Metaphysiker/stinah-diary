import { Component, OnInit, Input } from '@angular/core';
import { Entry } from '../entry';
import { EntryService } from '../entry.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-entries-overview',
  templateUrl: './entries-overview.component.html',
  styleUrls: ['./entries-overview.component.css']
})
export class EntriesOverviewComponent implements OnInit {

  entries: Entry[] = [];
  search_string = new FormControl('');
  name = new FormControl('');

  constructor(
    private entryService: EntryService
  ) { }

  ngOnInit(): void {
    this.searchEntries();
  }

  searchEntries(){
    var search_field_value = "";
    if(this.search_string.value){
      search_field_value = this.search_string.value
    }

    this.entryService.searchEntries(search_field_value)
    .then((data: any) => {
      this.entries = data;
    });


  }

  getEntries(search_string: string = ""){
    this.entryService.searchEntries(search_string)
    .then((data: any) => {
      this.entries = data;
    });
  }

}
