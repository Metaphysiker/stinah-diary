import { Component, OnInit, Input, EventEmitter, Output, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl  } from '@angular/forms';
import { File } from '../file';


@Component({
  selector: 'app-file-form',
  templateUrl: './file-form.component.html',
  styleUrls: ['./file-form.component.css']
})
export class FileFormComponent implements OnInit {

  pleaseWait: boolean = true;

  fileForm = new FormGroup({
    parent_id: new FormControl(0),
    parent_class: new FormControl(''),
    file: new FormControl('')
  });


  @Input() parent: any;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {

    console.log(changes);
    console.log(this.parent);

    console.log("instanceof");
    console.log(typeof this.parent);

    var changes_parent_id = changes?.['parent']?.['currentValue']?.["_id"];
    var changes_parent_class = changes?.['parent']?.['currentValue']?.["_id"];
    //console.log(changes_parent_id);
    //this is not needed but it helps to debug. Make input field visible to see id
    if(changes_parent_id){
      this.fileForm.patchValue({
        parent_id: changes_parent_id,
        parent_class: changes_parent_class
      });
      this.pleaseWait = false;
    }


  }

  onFileChange(event: any) {

    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.fileForm.patchValue({
        file: file
      });
    }
  }



  onSubmit() {

    this.pleaseWait = true;

    console.log(this.parent);


    this.fileForm.patchValue({
      parent_id: this.parent._id
    });
    console.warn(this.fileForm.value);

  }

}
