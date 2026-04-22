import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-shop',
  imports: [CommonModule],
  templateUrl: './shop.html',
  styleUrl: './shop.css',
})
export class Shop implements OnInit {
  products: any[] = [];
  activeCategory = 'all';
  isLoading = true;

  constructor(private cart: CartService, private api: ApiService) {}

  ngOnInit() {
    this.api.getProducts().subscribe({
      next: (data) => {
        this.products = data;
        setTimeout(() => this.isLoading = false, 800); // Shimmer effect
      },
      error: (err) => {
        console.error('Failed to load products', err);
        this.isLoading = false;
      }
    });
  }

  addToCart(p: any) {
    this.cart.addToCart(p);
    alert(p.name + ' added to cart!');
  }
}
