import { Injectable, signal, computed, inject } from '@angular/core';
import { AdminAuthService } from './admin-auth';
import { ToastService } from './toast';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  qty: number;
  customization?: {
    customName?: string;
    customMessage?: string;
    selectedColor?: string;
    selectedSize?: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private auth = inject(AdminAuthService);
  private toast = inject(ToastService);
  
  // Use Angular Signals to hold state
  items = signal<CartItem[]>([]);

  // Computed total
  subtotal = computed(() => {
    return this.items().reduce((acc, curr) => acc + (curr.price * curr.qty), 0);
  });

  isEligibleForDiscount = computed(() => {
    const user = this.auth.currentUser();
    return !!user && user.role === 'user' && !user.hasUsedDiscount;
  });

  discountAmount = computed(() => {
    return this.isEligibleForDiscount() ? Math.round(this.subtotal() * 0.1) : 0;
  });

  total = computed(() => {
    return this.subtotal() - this.discountAmount();
  });

  addToCart(product: any, customization?: any) {
    const currentItems = this.items();
    // Unique key check including customization
    const existing = currentItems.find(i => 
      i.name === product.name && 
      JSON.stringify(i.customization) === JSON.stringify(customization)
    );

    if (existing) {
      existing.qty++;
      this.items.set([...currentItems]);
    } else {
      this.items.set([...currentItems, { 
        id: Math.random().toString(36).substr(2, 9), 
        name: product.name, 
        price: product.price + (customization ? (product.customizationPrice || 0) : 0), 
        image: product.image, 
        qty: 1,
        customization
      }]);
    }

    // Show cute toast
    this.toast.show(product.name, product.image);
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
