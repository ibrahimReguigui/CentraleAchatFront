import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
    url="http://localhost:8096/company"
    constructor(private http:HttpClient) { }
    getCompany(idCompany: any): Observable<any> {
        const params = new HttpParams().set('idC', idCompany);
        return this.http.get(`${this.url}/getCompany`, {params});
    }
}
