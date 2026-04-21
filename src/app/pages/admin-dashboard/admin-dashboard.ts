import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderService } from '../../services/order';

@Component({
  selector: 'app-admin-dashboard',
  imports: [CommonModule],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css',
})
export class AdminDashboard {
  constructor(public orderService: OrderService) {}
}
