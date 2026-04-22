import { Component, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartService } from '../../services/cart';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-cart',
  imports: [CommonModule, RouterModule],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart implements OnInit {
  isLoading = true;
  constructor(public cart: CartService, public api: ApiService) {}

  ngOnInit() {
    setTimeout(() => {
      this.isLoading = false;
    }, 700);
  }

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
