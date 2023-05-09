
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Vehicule } from '../model/vehicule';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VehiculeService {

  private baseUrl = 'http://localhost:8098/vehicule';

  constructor(private httpClient: HttpClient) {}

    getVehiculeList(): Observable<Vehicule[]>{
      return this.httpClient.get<Vehicule[]>(`${this.baseUrl}/getallVehicule`);
   }


   createVehicule(vehicule: Vehicule): Observable<Object>{
    return this.httpClient.post(`${this.baseUrl}/create`, vehicule);
  }

  deleteVehicule(idVehicule: number): Observable<any> {
    return this.httpClient.delete(`${this.baseUrl}/deleteVehicule?idVehicule=${idVehicule}`);
  }

  
  
  updateVehicule(id: number, vehicule: Vehicule): Observable<Object> {
    return this.httpClient.put(`${this.baseUrl}/update/${id}`, vehicule);
  }


  getVehiculeStatistics(): Observable<any> {
    return this.httpClient.get<any>(`${this.baseUrl}/statistics`);
  }
  
  

  getVehiculeStatisticsByLocation(): Observable<any> {
    return this.httpClient.get<any>(`${this.baseUrl}/statistics-by-location`);
  }

  getVehiculeStatisticsByDate(startDate: string, endDate: string): Observable<any> {
    return this.httpClient.get<any>(`${this.baseUrl}/statistics-by-date?startDate=${startDate}&endDate=${endDate}`);
  }
  
  

  



  
  }

