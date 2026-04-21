import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../services/cart';

@Component({
  selector: 'app-checkout',
  imports: [CommonModule, FormsModule],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css',
})
export class Checkout {
  customer = {
    name: '',
    phone: '',
    address: '',
    city: ''
  };

  constructor(public cart: CartService) {}

  placeOrder() {
    if(!this.customer.name || !this.customer.phone || !this.customer.address) {
      alert("Please fill all required fields!");
      return;
    }

    if(this.cart.items().length === 0) {
      alert("Your cart is empty!");
      return;
    }

    const number = "917902805012"; 
    const total = this.cart.total();
    
    let message = `*New Order from Lil Cradle* \n\n`;
    message += `*Customer Details:*\n`;
    message += `Name: ${this.customer.name}\n`;
    message += `Phone: ${this.customer.phone}\n`;
    message += `Address: ${this.customer.address}, ${this.customer.city}\n\n`;

    message += `*Order Items:*\n`;
    this.cart.items().forEach(item => {
      message += `- ${item.qty}x ${item.name} ($${item.price})\n`;
    });

    message += `\n*TOTAL: $${total}*`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${number}?text=${encodedMessage}`, '_blank');
  }
}
