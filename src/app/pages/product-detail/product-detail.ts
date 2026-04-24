import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../services/cart';
import { ApiService } from '../../services/api.service';
import { AdminAuthService } from '../../services/admin-auth';

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

  // Customization State
  customization = {
    customName: '',
    customMessage: '',
    selectedColor: '',
    selectedSize: ''
  };

  isLoading = true;
  reviews: any[] = [];
  reviewData = {
    userName: '',
    rating: 5,
    comment: ''
  };
  isSubmittingReview = false;

  constructor(
    private route: ActivatedRoute, 
    private cart: CartService, 
    public api: ApiService,
    public auth: AdminAuthService
  ) {}

  ngOnInit() {
    // Pre-fill user name from account if logged in
    const user = this.auth.currentUser();
    if (user) {
      this.reviewData.userName = user.name;
    }

    this.route.paramMap.subscribe(params => {
      this.isLoading = true;
      const id = params.get('id');
      
      if (id) {
        this.api.getProduct(id).subscribe({
          next: (data) => {
            this.product = data;
            this.isLoading = false;
            this.loadReviews();
            // Reset customization defaults
            if (this.product.colorVariants?.length) this.customization.selectedColor = this.product.colorVariants[0];
            if (this.product.sizeVariants?.length) this.customization.selectedSize = this.product.sizeVariants[0];
          },
          error: (err) => {
            console.error('Failed to load product', err);
            this.isLoading = false;
          }
        });
      }
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

  get totalPrice(): number {
    if (!this.product) return 0;
    let base = this.product.price;
    if (this.product.isCustomizable) base += (this.product.customizationPrice || 0);
    return base * this.quantity;
  }

  addToCart() {
    const custom = this.product.isCustomizable ? { ...this.customization } : undefined;
    for (let i = 0; i < this.quantity; i++) {
      this.cart.addToCart(this.product, custom);
    }
  }
}
