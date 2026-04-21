import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-dashboard',
  imports: [CommonModule],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css',
})
export class AdminDashboard {
  stats = [
    { title: 'Total Revenue', value: '$24,590.00', trend: '+14% vs last month', up: true },
    { title: 'Orders Today', value: '142', trend: '+5% vs yesterday', up: true },
    { title: 'Avg Order Value', value: '$173.00', trend: '-2% vs last month', up: false },
    { title: 'Total Customers', value: '1,429', trend: '+22% vs last month', up: true }
  ];

  recentOrders = [
    { id: '#ORD-001', customer: 'Sarah Jenkins', date: 'Today, 2:30 PM', total: '$145.00', status: 'Processing', statusColor: 'yellow' },
    { id: '#ORD-002', customer: 'Michael Chen', date: 'Today, 1:15 PM', total: '$89.00', status: 'Shipped', statusColor: 'green' },
    { id: '#ORD-003', customer: 'Emma Watson', date: 'Today, 10:45 AM', total: '$210.00', status: 'Delivered', statusColor: 'blue' },
    { id: '#ORD-004', customer: 'David Miller', date: 'Yesterday', total: '$65.00', status: 'Cancelled', statusColor: 'red' },
  ];
}
