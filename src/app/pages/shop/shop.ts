import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PRODUCTS } from '../../data/product';
import { CartService } from '../../services/cart';

@Component({
  selector: 'app-shop',
  imports: [CommonModule],
  templateUrl: './shop.html',
  styleUrl: './shop.css',
})
export class Shop {
  products = PRODUCTS;
  activeCategory = 'all';

  constructor(private cart: CartService) {}

  addToCart(p: any) {
    this.cart.addToCart(p);
    alert(p.name + ' added to cart!');
  }
}
