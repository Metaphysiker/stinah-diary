import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-entries',
  templateUrl: './entries.component.html',
  styleUrls: ['./entries.component.css']
})
export class EntriesComponent implements OnInit {

  @Input() input_animal_id = 0;
  @Input() entries: any[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
