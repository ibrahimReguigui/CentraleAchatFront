import { Component, OnInit } from '@angular/core';
import {ReviewService} from "../service/review.service";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {review} from "../models/review";
import { map } from 'rxjs';


@Component({
  selector: 'app-update-review',
  templateUrl: './update-review.component.html',
  styleUrls: ['./update-review.component.scss']
})
export class UpdateReviewComponent  implements OnInit {
  review:review;
  params: any;
  constructor(private reviewService: ReviewService,
    private router:Router,
    private activatedRoute:ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(p => this.params = p.id)
    console.log(this.params)
    this.reviewService.getReviewById(this.params).subscribe((review:review) => {
      this.review = review;
      console.log(this.review)
    })
  }


  
  //review: review=new review();
  
  updateReview(){
          this.reviewService.updateReview(this.review).subscribe(
            (response: any) => {
              this.router.navigate(['/getreview'])
            },
            (error: any) => {
              console.log(error.status);
              console.log(error.statusText);
            }
          );
        }
}