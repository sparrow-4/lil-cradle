import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderService } from '../../services/order';

@Component({
  selector: 'app-admin-orders',
  imports: [CommonModule],
  templateUrl: './admin-orders.html',
  styleUrl: './admin-orders.css',
})
export class AdminOrders {
  constructor(public orderService: OrderService) {}

  cycleStatus(orderId: string, currentStatus: string) {
    const sequence = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'] as const;
    let nextIndex = (sequence.indexOf(currentStatus as any) + 1) % sequence.length;
    this.orderService.updateOrderStatus(orderId, sequence[nextIndex]);
  }
}
