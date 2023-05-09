import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {

  constructor(private http: HttpClient) { }

  getSupplierById(id: any) {
    return this.http.get<any>('assets/demo/data/supplier.json')
      .toPromise()
      .then(res => res.data.find(r => {
        return r.id === id;
      }))
      .then(data => data);
  }
}
