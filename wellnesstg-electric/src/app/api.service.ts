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

  constructor(private httpClient: HttpClient) {
  }

  sendCSV(array: any): Promise<any> {
    return this.httpClient.post<any>(`${this.baseUrl}/post-csv`, array ).toPromise();
  }

  createHeaders() {
    let headers = new HttpHeaders()
    headers=headers.append('content-type','application/json')
    headers=headers.append('Access-Control-Allow-Origin', '*')
    headers=headers.append('content-type','application/x-www-form-urlencoded')
    return headers
  }
}
