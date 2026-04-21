import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PRODUCTS } from '../../data/product';


@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [RouterModule,CommonModule,],
  templateUrl: './product-card.html',
})
export class ProductCardComponent {

 products = PRODUCTS;

activeTab = 'featured';

get filteredProducts() {
  return this.products.filter(p => p.type === this.activeTab);
}
}