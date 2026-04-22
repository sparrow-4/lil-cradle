import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart';
import { OrderService } from '../../services/order';

@Component({
  selector: 'app-checkout',
  imports: [CommonModule, FormsModule],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css',
})
export class Checkout implements OnInit {
  isLoading = true;
  customer = {
    name: '',
    phone: '',
    address: '',
    city: ''
  };

  constructor(public cart: CartService, private orderService: OrderService, private router: Router) {}

  ngOnInit() {
    this.isLoading = false;
  }

  isProcessing = false;

  placeOrder() {
    if(!this.customer.name || !this.customer.phone || !this.customer.address) {
      alert("Please fill all required fields!");
      return;
    }

    if(this.cart.items().length === 0) {
      alert("Your cart is empty!");
      return;
    }

    this.isProcessing = true;

    const number = "917902805012"; 
    const total = this.cart.total();
    
    let message = `*New Order from Lil Cradle* \n\n`;
    message += `*Customer Details:*\n`;
    message += `Name: ${this.customer.name}\n`;
    message += `Phone: ${this.customer.phone}\n`;
    message += `Address: ${this.customer.address}, ${this.customer.city}\n\n`;

    message += `*Order Items:*\n`;
    this.cart.items().forEach(item => {
      message += `- ${item.qty}x ${item.name} (₹${item.price})\n`;
    });

    message += `\n*TOTAL: ₹${total}*`;

    // Save to Admin system first
    this.orderService.addOrder({
      firstName: this.customer.name,
      phone: this.customer.phone,
      address: this.customer.address,
      city: this.customer.city
    }, this.cart.items(), total).subscribe({
      next: () => {
        const encodedMessage = encodeURIComponent(message);
        window.open(`https://wa.me/${number}?text=${encodedMessage}`, '_blank');
        
        // Clear cart and redirect
        this.cart.items.set([]);
        this.isProcessing = false;
        this.router.navigate(['/']);
      },
      error: (err) => {
        alert("Something went wrong while placing your order. Please try again.");
        this.isProcessing = false;
      }
    });
  }
}
