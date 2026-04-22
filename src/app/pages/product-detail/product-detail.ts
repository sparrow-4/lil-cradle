import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../services/cart';
import { ApiService } from '../../services/api.service';

import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-detail',
  imports: [CommonModule, FormsModule],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css',
})
export class ProductDetail implements OnInit {
  product: any;
  quantity = 1;

  isLoading = true;
  reviews: any[] = [];
  reviewData = {
    userName: '',
    rating: 5,
    comment: ''
  };
  isSubmittingReview = false;

  constructor(private route: ActivatedRoute, private cart: CartService, public api: ApiService) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.isLoading = true;
      const name = params.get('id');
      
      this.api.getProducts().subscribe({
        next: (data) => {
          this.product = data.find((p: any) => p.name === name) || data[0];
          this.isLoading = false;
          if(this.product?._id) {
            this.loadReviews();
          }
        },
        error: (err) => {
          console.error('Failed to load product', err);
          this.isLoading = false;
        }
      });
    });
  }

  loadReviews() {
    this.api.getProductReviews(this.product._id).subscribe(data => {
      this.reviews = data;
    });
  }

  submitReview() {
    if(!this.reviewData.userName || !this.reviewData.comment) {
      alert('Please fill in your name and comment.');
      return;
    }

    this.isSubmittingReview = true;
    const submission = {
      ...this.reviewData,
      productId: this.product._id
    };

    this.api.submitReview(submission).subscribe({
      next: () => {
        alert('Thank you! Your review has been submitted and is awaiting approval.');
        this.reviewData = { userName: '', rating: 5, comment: '' };
        this.isSubmittingReview = false;
      },
      error: () => {
        alert('Failed to submit review. Please try again.');
        this.isSubmittingReview = false;
      }
    });
  }

  addToCart() {
    for (let i = 0; i < this.quantity; i++) {
      this.cart.addToCart(this.product);
    }
    alert(this.quantity + 'x ' + this.product.name + ' added to cart!');
  }
}
