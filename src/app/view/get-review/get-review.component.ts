import { Component, OnInit } from '@angular/core';
import { ReviewService } from 'src/app/service/review.service';
import { review } from 'src/app/models/review';

@Component({
  selector: 'app-get-review',
  templateUrl: './get-review.component.html',
  styleUrls: ['./get-review.component.scss']
})
export class GetReviewComponent implements OnInit {

  reviews: review[] = [];

  constructor(private reviewService: ReviewService) { }

  ngOnInit(): void {
    this.reviewService.getAllReviews().subscribe(
      data => this.reviews = data,
      error => console.log(error)
    );
  }

  deleteReview(reviewId: number) {
    this.reviewService.deleteReview(reviewId).subscribe(() => {
    this.reviews = this.reviews.filter(review => review.idReview !== reviewId);
    });
  }

}
