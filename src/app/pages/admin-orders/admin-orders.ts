import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderService } from '../../services/order';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-orders',
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-orders.html',
  styleUrl: './admin-orders.css',
})
export class AdminOrders {
  constructor(public orderService: OrderService) {}

  statuses = ['Pending', 'Processing', 'Shipped', 'Out for Delivery', 'Delivered', 'Cancelled'] as const;

  updateStatus(orderId: string, newStatus: any) {
    this.orderService.updateOrderStatus(orderId, newStatus);
  }
}
