import { Injectable, signal, computed, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

export interface Order {
  id: string; // Legacy ID
  _id?: string; // MongoDB ID
  orderId?: string; // MongoDB generated friendly ID
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  date: string;
  items: any[];
  total: number;
  status: 'Pending' | 'Processing' | 'Shipped' | 'Out for Delivery' | 'Delivered' | 'Cancelled';
  statusColor: string;
}

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private api = inject(ApiService);
  orders = signal<Order[]>([]);
  products = signal<any[]>([]);

  constructor() {
    this.api.getOrders().subscribe(data => {
      this.orders.set(data);
    });
    this.api.getProducts().subscribe(data => {
      this.products.set(data);
    });
  }

  // Analytics computed signals
  totalRevenue = computed(() => {
    return this.orders().reduce((acc, order) => {
      // Don't count cancelled orders in revenue
      if(order.status !== 'Cancelled') return acc + order.total;
      return acc;
    }, 0);
  });

  totalProfit = computed(() => {
    return this.orders().reduce((acc, order) => {
      if (order.status === 'Cancelled') return acc;
      
      const orderProfit = order.items.reduce((itemAcc, item) => {
        // Find product to get its current costPrice
        const product = this.products().find(p => p.name === item.name);
        const cost = product ? product.costPrice : 0;
        return itemAcc + ((item.price - cost) * item.qty);
      }, 0);
      
      return acc + orderProfit;
    }, 0);
  });

  ordersTodayCount = computed(() => {
    const today = new Date().toLocaleDateString();
    return this.orders().filter(o => o.date.includes(today)).length;
  });

  averageOrderValue = computed(() => {
    const count = this.orders().filter(o => o.status !== 'Cancelled').length;
    if (count === 0) return 0;
    return this.totalRevenue() / count;
  });

  salesByDay = computed(() => {
    const days = 7;
    const result = [];
    const now = new Date();
    
    for (let i = 0; i < days; i++) {
      const d = new Date();
      d.setDate(now.getDate() - (days - 1 - i));
      const dateStr = d.toLocaleDateString();
      
      const total = this.orders()
        .filter(o => o.date.includes(dateStr) && o.status !== 'Cancelled')
        .reduce((sum, o) => sum + o.total, 0);
        
      result.push({
        label: d.toLocaleDateString('en-US', { weekday: 'short' }),
        value: total,
        date: dateStr
      });
    }
    
    // Normalize heights (0-100%)
    const max = Math.max(...result.map(r => r.value), 100);
    return result.map(r => ({
      ...r,
      height: (r.value / max) * 90 // Max height 90% for UI padding
    }));
  });

  addOrder(customerData: any, cartItems: any[], totalCost: number): Observable<Order> {
    const newOrder = {
      customerName: customerData.firstName + ' ' + (customerData.lastName || ''),
      customerPhone: customerData.phone,
      customerAddress: customerData.address + ', ' + customerData.city,
      items: cartItems,
      total: totalCost
    };

    const obs = this.api.createOrder(newOrder);
    obs.subscribe(data => {
      this.orders.update(current => [data, ...current]);
    });
    return obs;
  }

  updateOrderStatus(orderId: string, newStatus: Order['status']) {
    const order = this.orders().find(o => o.id === orderId || (o as any)._id === orderId);
    if(!order) return;
    const realId = (order as any)._id || orderId;

    this.api.updateOrderStatus(realId, newStatus).subscribe({
      next: (data) => {
        this.orders.update(orders => 
          orders.map(o => ((o as any)._id === realId || o.id === realId) ? data : o)
        );
      },
      error: (err) => {
        alert('Failed to update status. Please try again.');
        console.error(err);
      }
    });
  }
}
