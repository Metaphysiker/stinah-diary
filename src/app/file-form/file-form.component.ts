import { Component, OnInit, Input, EventEmitter, Output, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl  } from '@angular/forms';
import { File } from '../file';
import { Entry } from '../entry';
import { FileService } from '../file.service';


@Component({
  selector: 'app-file-form',
  templateUrl: './file-form.component.html',
  styleUrls: ['./file-form.component.css']
})
export class FileFormComponent implements OnInit {

  pleaseWait: boolean = true;

  fileForm = new FormGroup({
    parent_id: new FormControl(0),
    parent_collection_name: new FormControl(''),
    file: new FormControl('')
  });


  @Input() parent: Entry | undefined;

  constructor(
    private fileService: FileService
  ) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {

    var changes_parent_id = changes?.['parent']?.['currentValue']?.["_id"];
    var changes_parent_collection_name = changes?.['parent']?.['currentValue']?.["collection_name"];

    //console.log(changes_parent_id);
    //this is not needed but it helps to debug. Make input field visible to see id
    if(changes_parent_id && changes_parent_collection_name){
      this.fileForm.patchValue({
        parent_id: changes_parent_id,
        parent_collection_name: changes_parent_collection_name
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

    if(this?.parent?._id){
      this.fileForm.patchValue({
        parent_id: this.parent._id
      });
    }

    if(this?.parent?.collection_name){
      this.fileForm.patchValue({
        parent_collection_name: this.parent.collection_name
      });
    }

    console.warn(this.fileForm.value);

    this.fileService.createFile(this.fileForm.value).then((response: any) => {
        //this.router.navigate(['/animals-overview']);
        //console.log(response);
        //this.addNewEntry(response);
        this.pleaseWait = false;
        this.fileForm.reset();

      });

  }

}
