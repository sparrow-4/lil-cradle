import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Shop } from './pages/shop/shop';
import { Cart } from './pages/cart/cart';
import { Checkout } from './pages/checkout/checkout';
import { Blog } from './pages/blog/blog';
import { Contact } from './pages/contact/contact';
import { ProductDetail } from './pages/product-detail/product-detail';

// Admin Imports
import { AdminLogin } from './pages/admin-login/admin-login';
import { AdminLayout } from './pages/admin-layout/admin-layout';
import { AdminDashboard } from './pages/admin-dashboard/admin-dashboard';
import { AdminSettings } from './pages/admin-settings/admin-settings';
import { AdminOrders } from './pages/admin-orders/admin-orders';
import { AdminProducts } from './pages/admin-products/admin-products';
import { AdminGuard } from './guards/admin.guard';

export const routes: Routes = [
  // Public Storefront routes
  { path: '', component: Home },
  { path: 'shop', component: Shop },
  { path: 'product/:id', component: ProductDetail },
  { path: 'cart', component: Cart },
  { path: 'checkout', component: Checkout },
  { path: 'blog', component: Blog },
  { path: 'contact', component: Contact },

  // Admin Routes
  { path: 'login', component: AdminLogin },
  { 
    path: 'admin/dashboard', 
    component: AdminLayout, 
    canActivate: [AdminGuard],
    children: [
      { path: '', component: AdminDashboard },
      { path: 'reports', component: AdminDashboard },
      { path: 'orders', component: AdminOrders },
      { path: 'products', component: AdminProducts },
      { path: 'settings', component: AdminSettings }
    ]
  }
];