import { Injectable } from '@angular/core';
declare const localforage: any;

@Injectable({
  providedIn: 'root'
})
export class LocalforageService {

  constructor() { }

  setItem(key: any, value: any){
    return localforage.setItem(key, value);
  }

  getItem(key: any){
    return localforage.getItem(key);
  }
}
