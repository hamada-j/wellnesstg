import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from "@angular/common/http";
import { Customer } from './model/model';
import { environment } from "../environments/environment";

const BACKEND_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseUrl = BACKEND_URL;

  action$ = new EventEmitter<String>();

  constructor(private httpClient: HttpClient) {
  }

  sendCSV(array: any): Promise<any> {
    return this.httpClient.post<any>(`${this.baseUrl}/post-csv`, array ).toPromise();
  }

  sendRecord(form: Customer): Promise<Customer> {
    return this.httpClient.post<Customer>(`${this.baseUrl}/post-one`, form ).toPromise();
  }

  getAll(): Promise<Customer[]>{
    return this.httpClient.get<Customer[]>(`${this.baseUrl}/`).toPromise();
  }

  editRecord(form: Customer): Promise<Customer> {
    return this.httpClient.put<Customer>(`${this.baseUrl}/edit-one`, form ).toPromise();
  }

  deleteRecord(_id: string | null): Promise<string> {
    return this.httpClient.delete<string>(`${this.baseUrl}/delete-one/${_id}`).toPromise();
  }

  createHeaders() {
    let headers = new HttpHeaders()
    headers=headers.append('content-type','application/json')
    headers=headers.append('Access-Control-Allow-Origin', '*')
    headers=headers.append('content-type','application/x-www-form-urlencoded')
    return headers
  }
}
