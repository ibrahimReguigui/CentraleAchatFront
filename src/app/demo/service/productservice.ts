import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Product } from '../domain/product';
import {Observable} from "rxjs";
import {Categorie} from "../domain/categorie";
import {Unite} from "../domain/unite";
import {Departement} from "../domain/departement";

@Injectable()
export class ProductService {
    private apiUrl = 'http://localhost:8097/product';
    constructor(private http: HttpClient) { }



   getAllProducts() {
    return this.http.get<Product[]>(this.apiUrl + "/get-products")
    // .then(data => data)
   }
    exportToPDF() {
        return this.http.get(this.apiUrl+'/export/pdf', { responseType: 'blob' });
    }
    getTopSellingProducts(): Observable<Product[]> {
        return this.http.get<Product[]>("http://localhost:8097/product/GetTop");
    }

    getAllCategories() {
        return this.http.get<Categorie[]>("http://localhost:8097/Categorie/get-categories")
        // .then(data => data)
    }
    getAllUnites() {
        return this.http.get<Unite[]>("http://localhost:8097/Unit/get-unites")
        // .then(data => data)
    }
    getAllDepartement() {
        return this.http.get<Departement[]>("http://localhost:8097/Departement/get-Departement")
        // .then(data => data)
    }

   deleteProduct(id: number) {
    return this.http.delete(this.apiUrl+ `/delete/${id}`)
   }

   updateproduct(id: number,product: Product) {
    return this.http.put(this.apiUrl+`/update/${id}`,product)
   }

   addproduct(product: Product) {
    return this.http.post(this.apiUrl+`/add`,product)
   }
    addProductAndAffect(idCategorie: number, idUnit: number, idDepartement: number, product: Product): Observable<Product> {
        return this.http.post<Product>(this.apiUrl+"/addProductAndAffect/1/1/1", product);
    }
    getProductsSmall() {
        return this.http.get<any>('assets/demo/data/products-small.json')
        .toPromise()
        .then(res => res.data as Product[])
        .then(data => data);
    }

    getProducts() {
        return this.http.get<any>('assets/demo/data/products.json')
        .toPromise()
        .then(res => res.data as Product[])
        .then(data => data);
    }

    getProductsMixed() {
        return this.http.get<any>('assets/demo/data/products-mixed.json')
        .toPromise()
        .then(res => res.data as Product[])
        .then(data => data);
    }

    getProductsWithOrdersSmall() {
        return this.http.get<any>('assets/demo/data/products-orders-small.json')
        .toPromise()
        .then(res => res.data as Product[])
        .then(data => data);
    }
}
