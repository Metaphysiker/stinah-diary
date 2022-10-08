import { Component, OnInit, Input } from '@angular/core';
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
    content: new FormControl(''),
    animal_id: new FormControl(0)
    });

  @Input() input_animal_id = 0;
  constructor(
    private entryService: EntryService
  ) { }

  ngOnInit(): void {

  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    this.entryForm.patchValue({
      animal_id: this.input_animal_id
    });
    console.warn(this.entryForm.value);

  this.entryService.createEntry(this.entryForm.value).then((response: any) => {
      //this.router.navigate(['/animals-overview']);
      console.log(response);
    });
  }

}
