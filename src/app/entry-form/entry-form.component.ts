import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl  } from '@angular/forms';
import { EntryService } from '../entry.service';
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
  constructor(
    private entryService: EntryService
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.entryForm.value);

  this.entryService.createEntry(this.entryForm.value.content).then((response: any) => {
      //this.router.navigate(['/animals-overview']);
      console.log(response);
    });
  }

}
