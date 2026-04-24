import { Injectable, signal } from '@angular/core';

export interface Toast {
  id: number;
  message: string;
  productImage?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  toasts = signal<Toast[]>([]);

  show(message: string, productImage?: string) {
    const id = Date.now();
    this.toasts.update(current => [...current, { id, message, productImage }]);
    
    // Auto-remove after 3 seconds
    setTimeout(() => {
      this.toasts.update(current => current.filter(t => t.id !== id));
    }, 3000);
  }
}
