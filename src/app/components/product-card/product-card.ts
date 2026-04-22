import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { CartService } from '../../services/cart';


@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [RouterModule,CommonModule,],
  templateUrl: './product-card.html',
})
export class ProductCardComponent {

  products: any[] = [];
  activeTab = 'featured';

  constructor(private cart: CartService, public api: ApiService) {
    this.api.getProducts().subscribe(data => this.products = data);
  }

  get filteredProducts() {
    return this.products.filter(p => p.type === this.activeTab);
  }

  addToCart(event: Event, product: any) {
    event.stopPropagation(); // Prevent routing to product page
    this.cart.addToCart(product);
    alert(product.name + ' added to cart!');
  }
}