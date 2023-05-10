import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Order} from "../domain/order";
import { jsPDF } from "jspdf";
// @ts-ignore
import autoTable from 'jspdf-autotable';
import {Bill} from "../domain/bill";
@Injectable({
  providedIn: 'root'
})
export class OrderService {
    public host:String="http://localhost:8094/order"
  constructor(private http:HttpClient) { }

    public getOrders(): Observable<any> {
        return this.http.get<any>(this.host+"/retrieveAllOrder")
    }

    saveOrder(order,userId,offerId) {
        return this.http.post(this.host+`/createOrder/6ed7c941-f2f4-4098-8bf3-40c08f1cf911/${userId}/${offerId}`, order);
    }


    confirmOrder(idOrder: number): Observable<any> {
        return this.http.post(`${this.host}/confirmerOrder/${idOrder}`, {});
    }

    denyOrder(idOrder: number): Observable<any> {
        return this.http.post(`${this.host}/denyOrder/${idOrder}`, {});
    }
    retournerOrder(idOrder: number): Observable<any> {
        return this.http.post(`${this.host}/retournerOrder/${idOrder}`, {});
    }

    generatePdf(idOrder: number) {
       return this.http.get<any>(`${this.host}/getBill/${idOrder}`);
    }
}

