import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NewTransaction } from '../models/NewTransaction';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(
    private http: HttpClient
  ) { }

  getData(id: string) {
    console.log(id);
  }

  postData(newTransactions: NewTransaction[], id: string): Promise<void> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(console.log(newTransactions, id))
      }, 2000)
    })
  }
}