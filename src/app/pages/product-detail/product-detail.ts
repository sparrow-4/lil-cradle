import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../services/cart';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-product-detail',
  imports: [CommonModule],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css',
})
export class ProductDetail implements OnInit {
  product: any;
  quantity = 1;

  isLoading = true;

  constructor(private route: ActivatedRoute, private cart: CartService, private api: ApiService) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.isLoading = true;
      const name = params.get('id');
      
      this.api.getProducts().subscribe({
        next: (data) => {
          this.product = data.find((p: any) => p.name === name) || data[0];
          setTimeout(() => this.isLoading = false, 700);
        },
        error: (err) => {
          console.error('Failed to load product', err);
          this.isLoading = false;
        }
      });
    });
  }

  addToCart() {
    for (let i = 0; i < this.quantity; i++) {
      this.cart.addToCart(this.product);
    }
    alert(this.quantity + 'x ' + this.product.name + ' added to cart!');
  }
}
