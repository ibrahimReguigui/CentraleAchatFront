import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Livraison } from '../model/livraison';
import { Observable } from 'rxjs';
import { Userdto } from '../model/userdto';


@Injectable({
  providedIn: 'root'
})
export class LivraisonService {

  private baseUrl = 'http://localhost:8098/livraison';

  private apiUrl = 'http://localhost:8096';


  constructor(private httpClient: HttpClient) {}

  affecterLivreurVehicule(codeBill: number): Observable<void> {
    return this.httpClient.post<void>(`${this.baseUrl}/affecterLivreurVehicule`, codeBill);
  }

  getLivraisonByCode(code: string): Observable<Livraison> {
    return this.httpClient.get<Livraison>(`${this.baseUrl}/livraisons/${code}`);
  }

  // getLivreurStatistics(idLivreur: string): Observable<Map<string, number>> {
  //   return this.httpClient.get<Map<string, number>>(`${this.baseUrl}/${idLivreur}/statistics`);
  // }
  getLivreurStatistics(idLivreur: string): Observable<Map<string, number>> {
    return this.httpClient.get<Map<string, number>>(`${this.baseUrl}/${idLivreur}/statistics`);
  }
  

  getAllLivreurIds(): Observable<string[]> {
    return this.httpClient.get<string[]>(`${this.baseUrl}/livreurs`);
  }

  getAllLivraisons(): Observable<Livraison[]> {
    return this.httpClient.get<Livraison[]>(`${this.baseUrl}/livraisons`);
  }

  getUsersByRole(role: string): Observable<Userdto[]> {
    return this.httpClient.get<Userdto[]>(`${this.apiUrl}/user/couriers/role/${role}`);
  }
  
}
