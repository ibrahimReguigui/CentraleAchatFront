import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BestProductsService {
  apiUrl = "http://localhost:8098/Review";  
  constructor(private http:HttpClient) { }

  bestProductForSuppliers(){
    return this.http.get(this.apiUrl+'/bestproduct');
  }
}
