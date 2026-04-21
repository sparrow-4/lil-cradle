import { Injectable, signal, computed } from '@angular/core';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  qty: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  
  // Use Angular Signals to hold state
  items = signal<CartItem[]>([]);

  // Computed total
  total = computed(() => {
    return this.items().reduce((acc, curr) => acc + (curr.price * curr.qty), 0);
  });

  addToCart(product: any) {
    const currentItems = this.items();
    const existing = currentItems.find(i => i.name === product.name);

    if (existing) {
      existing.qty++;
      this.items.set([...currentItems]);
    } else {
      this.items.set([...currentItems, { 
        id: Math.random().toString(), 
        name: product.name, 
        price: product.price, 
        image: product.image, 
        qty: 1 
      }]);
    }
  }

  removeFromCart(id: string) {
    this.items.set(this.items().filter(item => item.id !== id));
  }

  updateQuantity(id: string, qty: number) {
    const mapped = this.items().map(item => {
      if(item.id === id) item.qty = qty;
      return item;
    });
    this.items.set(mapped);
  }

  clearCart() {
    this.items.set([]);
  }
}
