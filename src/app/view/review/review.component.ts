import { Component, OnInit  } from '@angular/core';
import { review } from '../../models/review';
import { ReviewService } from '../../service/review.service'; 
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent {
  //review: any;

  constructor(private ReviewService: ReviewService) { }
  review: review=new review();

  save(){
   
    this.ReviewService.addReview(this.review).subscribe(
      (r=>console.log(r) )
    ); 
    
  }

/*   getreviews(): void {
    this.ReviewService.getreview()
      .subscribe(reviews => this.review = reviews);
  }

  add(comment: string, noteReview: string, idClient: string, idSupplier: string): void {
    comment = comment.trim();
    noteReview = noteReview.trim();
    idClient = idClient.trim();
    if (!comment || !noteReview || !idClient || !idSupplier) {
      return;
    }
    this.ReviewService.addReview({ comment, noteReview,idClient, idSupplier } as review)
      .subscribe(review => {
        this.review.push(review);
      });
  }

  delete(review: review): void {
    this.review = this.review.filter(o => o !== review);
    this.ReviewService.deletereview(review).subscribe();
  } */
 

}
