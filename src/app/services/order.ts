import { Injectable, signal, computed } from '@angular/core';

export interface Order {
  id: string;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  date: string;
  items: any[];
  total: number;
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  statusColor: string;
}

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  orders = signal<Order[]>([]);

  // Analytics computed signals
  totalRevenue = computed(() => {
    return this.orders().reduce((acc, order) => {
      // Don't count cancelled orders in revenue
      if(order.status !== 'Cancelled') return acc + order.total;
      return acc;
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

  addOrder(customerData: any, cartItems: any[], totalCost: number) {
    const newOrder: Order = {
      id: '#ORD-' + Math.floor(1000 + Math.random() * 9000).toString(),
      customerName: customerData.firstName + ' ' + (customerData.lastName || ''),
      customerPhone: customerData.phone,
      customerAddress: customerData.address + ', ' + customerData.city,
      date: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      items: cartItems,
      total: totalCost,
      status: 'Pending',
      statusColor: 'yellow' // Yellow for pending/processing
    };

    this.orders.update(current => [newOrder, ...current]);
  }

  updateOrderStatus(orderId: string, newStatus: Order['status']) {
    let newColor = 'yellow';
    if (newStatus === 'Shipped') newColor = 'green';
    if (newStatus === 'Delivered') newColor = 'blue';
    if (newStatus === 'Cancelled') newColor = 'red';

    this.orders.update(orders => 
      orders.map(o => o.id === orderId ? { ...o, status: newStatus, statusColor: newColor } : o)
    );
  }
}
