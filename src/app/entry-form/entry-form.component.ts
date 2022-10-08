import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl  } from '@angular/forms';
import { EntryService } from '../entry.service';
import { Entry } from '../entry';
import { Animal } from '../animal';


@Component({
  selector: 'app-entry-form',
  templateUrl: './entry-form.component.html',
  styleUrls: ['./entry-form.component.css']
})
export class EntryFormComponent implements OnInit {

  @Input() animal: Animal = {
      name: "",
      _id: 0
    };

  @Output() newEntryEvent = new EventEmitter<Entry>();

  entryForm = new FormGroup({
    content: new FormControl(''),
    animal_id: new FormControl(0)
    });

  constructor(
    private entryService: EntryService
  ) { }

  ngOnInit(): void {

  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    this.entryForm.patchValue({
      animal_id: this.animal._id
    });
    //console.warn(this.entryForm.value);

  this.entryService.createEntry(this.entryForm.value).then((response: any) => {
      //this.router.navigate(['/animals-overview']);
      //console.log(response);
      this.addNewEntry(response);
      this.entryForm.reset();
    });
  }

  addNewEntry(entry: Entry) {
    this.newEntryEvent.emit(entry);
  }

}
