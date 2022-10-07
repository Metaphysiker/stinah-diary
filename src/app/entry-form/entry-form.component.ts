import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl  } from '@angular/forms';
//import { EntryService } from '../entry.service';
import { Entry } from '../entry';

@Component({
  selector: 'app-entry-form',
  templateUrl: './entry-form.component.html',
  styleUrls: ['./entry-form.component.css']
})
export class EntryFormComponent implements OnInit {
  entryForm = new FormGroup({
    content: new FormControl('')
    });
  constructor() { }

  ngOnInit(): void {
  }

}
