import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PRODUCTS } from '../../data/product';
import { CartService } from '../../services/cart';


@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [RouterModule,CommonModule,],
  templateUrl: './product-card.html',
})
export class ProductCardComponent {

  products = PRODUCTS;
  activeTab = 'featured';

  constructor(private cart: CartService) {}

  get filteredProducts() {
    return this.products.filter(p => p.type === this.activeTab);
  }

  addToCart(event: Event, product: any) {
    event.stopPropagation(); // Prevent routing to product page
    this.cart.addToCart(product);
    alert(product.name + ' added to cart!');
  }
}