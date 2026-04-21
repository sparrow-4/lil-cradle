import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { PRODUCTS } from '../../data/product';
import { CartService } from '../../services/cart';

@Component({
  selector: 'app-product-detail',
  imports: [CommonModule],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css',
})
export class ProductDetail implements OnInit {
  product: any;
  quantity = 1;

  constructor(private route: ActivatedRoute, private cart: CartService) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const name = params.get('id');
      this.product = PRODUCTS.find(p => p.name === name) || PRODUCTS[0]; 
    });
  }

  addToCart() {
    for (let i = 0; i < this.quantity; i++) {
      this.cart.addToCart(this.product);
    }
    alert(this.quantity + 'x ' + this.product.name + ' added to cart!');
  }
}
