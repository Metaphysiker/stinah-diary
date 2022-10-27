import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
declare const localforage: any;
import { ToDo } from './to-do';


@Injectable({
  providedIn: 'root'
})
export class ToDoService {

  constructor(
    private http: HttpClient
  ) { }
}
