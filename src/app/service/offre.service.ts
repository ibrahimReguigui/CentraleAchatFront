import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { Offer } from '../models/offer';

@Injectable({
  providedIn: 'root'
})

export class OffreService {
  
  offer : Offer = new Offer ; 
  apiUrl = "http://localhost:8098/Offer"; 

  constructor(private http: HttpClient ) { }

  getOffer(): Observable<any> {
    return this.http.get(this.apiUrl+'/getoffer');
  }

  addOffer(Offer: Offer) {
    return this.http.post(`${this.apiUrl}/addOffer`, Offer) ;
  }


}

