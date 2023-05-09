import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Product } from '../domain/product';
import {Observable} from "rxjs";
import {Categorie} from "../domain/categorie";
import {ca} from "@fullcalendar/core/internal-common";
@Injectable({providedIn:'root'})
export class CategorieService {
    private apiUrl = 'http://localhost:8097/Categorie';

    constructor(private http: HttpClient) {
    }

    getAllCategories() {
        return this.http.get<Categorie[]>("http://localhost:8097/Categorie/get-categories")
        // .then(data => data)
    }

    deleteCategorie(id: number) {
        return this.http.delete(this.apiUrl + `/delete/${id}`)
    }

    updateCategorie(id: number, categorie: Categorie) {
        return this.http.put(this.apiUrl + `/update/${id}`, categorie)
    }

    addCategorie(categorie: Categorie) {
        return this.http.post(this.apiUrl + `/add`, categorie)
    }
}
