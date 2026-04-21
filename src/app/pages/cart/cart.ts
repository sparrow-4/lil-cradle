import { Component, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartService } from '../../services/cart';

@Component({
  selector: 'app-cart',
  imports: [CommonModule, RouterModule],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart {
  constructor(public cart: CartService) {}

  remove(id: string) {
    this.cart.removeFromCart(id);
  }

  updateQty(item: any, amount: number) {
    const newQty = item.qty + amount;
    if (newQty > 0) {
      this.cart.updateQuantity(item.id, newQty);
    }
  }
}
