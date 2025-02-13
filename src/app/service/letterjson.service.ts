import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // تأكد من استيراد HttpClient
import { Observable } from 'rxjs';
import { Data } from './../interfaces/letters';

@Injectable({
  providedIn: 'root',
})
export class LetterjsonService {
  constructor(public _HttpClient: HttpClient) {}

  getLettersData(): Observable<Data> {
    return this._HttpClient.get<Data>('./assets/external.json');
  }
}
