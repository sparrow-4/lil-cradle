import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PRODUCTS } from '../../data/product';
import { CartService } from '../../services/cart';

@Component({
  selector: 'app-shop',
  imports: [CommonModule],
  templateUrl: './shop.html',
  styleUrl: './shop.css',
})
export class Shop implements OnInit {
  products = PRODUCTS;
  activeCategory = 'all';
  isLoading = true;

  constructor(private cart: CartService) {}

  ngOnInit() {
    // Artificial 800ms aesthetic shimmer delay
    setTimeout(() => {
      this.isLoading = false;
    }, 800);
  }

  addToCart(p: any) {
    this.cart.addToCart(p);
    alert(p.name + ' added to cart!');
  }
}
