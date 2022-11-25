import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { File } from '../file';
import { FileService } from '../file.service';


@Component({
  selector: 'app-aws-image',
  templateUrl: './aws-image.component.html',
  styleUrls: ['./aws-image.component.css']
})
export class AwsImageComponent implements OnInit {

  @Input() file: File | undefined;

  final_image_url: String = "";

  constructor(
    private fileService: FileService
  ) { }

  ngOnInit(): void {


  }


  ngOnChanges(changes: SimpleChanges): void {

    var changes_key = changes?.['file']?.['currentValue']?.["key"];

    if(changes_key){
      this.fileService.getSignedUrl(changes_key).then((response: any) => {

          this.final_image_url = response;
        });
    }

  }

}
