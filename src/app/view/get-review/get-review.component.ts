import { Component, OnInit } from '@angular/core';
import { ReviewService } from 'src/app/service/review.service';
import { review } from 'src/app/models/review';
import { ProductService } from 'src/app/demo/service/productservice';
import { SupplierService } from 'src/app/demo/service/supplier.service';
import { Product } from 'src/app/demo/domain/product';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-get-review',
  templateUrl: './get-review.component.html',
  providers: [MessageService, ConfirmationService],
  styleUrls: ['../../../assets/demo/badges.scss']
})
export class GetReviewComponent implements OnInit {
  productDialog: boolean = false;

    deleteProductDialog: boolean = false;

    deleteProductsDialog: boolean = false;
    review:review = {};
    products: Product[] = [];

    product: Product = {};

    selectedProducts: Product[] = [];

    submitted: boolean = false;

    cols: any[] = [];

    statuses: any[] = [];

    rowsPerPageOptions = [5, 10, 20];
  constructor(private reviewService: ReviewService,
    private productService:ProductService,
    private supplierService:SupplierService, private messageService: MessageService, private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.cols = [
      { field: 'product', header: 'Product' },
      { field: 'price', header: 'Price' },
      { field: 'category', header: 'Category' },
      { field: 'rating', header: 'Reviews' },
      { field: 'inventoryStatus', header: 'Status' }
    ];
    this.statuses = [
      { label: 'EXCELLENT', value: 'EXCELLENT' },
      { label: 'SATISFAIT', value: 'SATISFAIT' },
      { label: 'NONSATISFAIT', value: 'NONSATISFAIT' },
      { label: 'BAD', value: 'BAD' }
    ];
    this.reviewService.getAllReviews().subscribe(
      (data:any[]) => {
        data.map(r => {
          r.noteReview = r.avis == "EXCELLENT"? 5 : r.idReview == "SATISFAIT" ?  4 : r.idReview == "NONSATISFAIT" ? 2 : 1
          console.log(r.avis)
        })
      
        this.reviews = data;
      },
      error => console.log(error)
    );
  }
  openNew() {
      this.product = {};
      this.submitted = false;
      this.productDialog = true;
  }

  deleteSelectedProducts() {
      this.deleteProductsDialog = true;
  }

  editProduct(review: review) {
      this.review = { ...review };
      this.productDialog = true;
  }

  deleteProduct(review: review) {
      this.deleteProductDialog = true;
      this.review = { ...review };
  }

  confirmDeleteSelected() {
      /*this.deleteProductsDialog = false;
      this.products = this.products.filter(val => !this.selectedProducts.includes(val));
      this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
      this.selectedProducts = [];*/
  }

  confirmDelete() {
    this.deleteReview(this.review.idReview);
    this.deleteProductDialog = false;
    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'review Deleted', life: 3000 });
    this.product = {};
  }

  hideDialog() {
      this.productDialog = false;
      this.submitted = false;
  }

  saveProduct() {
    this.submitted = true;
    if (this.review.idReview) {
      // @ts-ignore
      this.review.avis = this.review.avis.value ? this.review.avis.value : this.review.avis;
      this.reviewService.addReview(this.review).subscribe((review: review) => {
        this.reviews[this.findIndexById(this.review.idReview)] = this.review;
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'review Updated', life: 3000 });
        this.reviews = [...this.reviews];
        this.productDialog = false;
        this.review = {};
      })

    } else {
      // @ts-ignore
      this.reviewService.addReview(this.review).subscribe(data => {
        console.log(this.review)
        this.reviews.push(this.review);
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'review Created', life: 3000 });
        this.reviews = [...this.reviews];
        this.productDialog = false;
        this.review = {};
      })

    }

  }

  findIndexById(id: number): number {
      let index = -1;
      for (let i = 0; i < this.reviews.length; i++) {
          if (this.reviews[i].idReview === id) {
              index = i;
              break;
          }
      }

      return index;
  }

  createId(): string {
      let id = '';
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      for (let i = 0; i < 5; i++) {
          id += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return id;
  }

  // onGlobalFilter(table: Table, event: Event) {
  //     table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  // }
  reviews: review[] = [];

  

  deleteReview(reviewId: number) {
    this.reviewService.deleteReview(reviewId).subscribe(() => {
    this.reviews = this.reviews.filter(review => review.idReview !== reviewId);
    });
  }

}
