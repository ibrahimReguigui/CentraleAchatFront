import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { review } from '../models/review';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  review : review = new review ; 

  apiUrl = "http://localhost:8098/Review"; 

  constructor(private http: HttpClient ) { }

  getReviewById(id: number): Observable<review> {
    return this.http.get<review>(`${this.apiUrl}/getreview/${id}`);
  }

  getAllReviews(): Observable<review[]> {
    return this.http.get<review[]>(`${this.apiUrl}/getreview`);
  }

  addReview(review: review) {
    return this.http.post(`${this.apiUrl}/addReview`, review) ;
 
  }

  updateReview(review : any) {
 
    return this.http.put(`${this.apiUrl}/updatereview`,review) ;

  }

  deleteReview(reviewId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/deletereview/${reviewId}`);
  }

}


