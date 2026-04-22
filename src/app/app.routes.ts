import { Routes } from '@angular/router';
import { AdminGuard } from './guards/admin.guard';
import { AdminAuthService } from './services/admin-auth';
import { inject } from '@angular/core';

export const routes: Routes = [
  // Public Storefront routes
  { path: '', loadComponent: () => import('./pages/home/home').then(m => m.Home) },
  { path: 'shop', loadComponent: () => import('./pages/shop/shop').then(m => m.Shop) },
  { path: 'product/:id', loadComponent: () => import('./pages/product-detail/product-detail').then(m => m.ProductDetail) },
  { path: 'cart', loadComponent: () => import('./pages/cart/cart').then(m => m.Cart) },
  { path: 'checkout', loadComponent: () => import('./pages/checkout/checkout').then(m => m.Checkout) },
  { path: 'blog', loadComponent: () => import('./pages/blog/blog').then(m => m.Blog) },
  { path: 'contact', loadComponent: () => import('./pages/contact/contact').then(m => m.Contact) },

  // Admin Routes
  { path: 'login', loadComponent: () => import('./pages/admin-login/admin-login').then(m => m.AdminLogin) },
  { path: 'register', loadComponent: () => import('./pages/register/register').then(m => m.Register) },
  { path: 'profile', loadComponent: () => import('./pages/user-profile/user-profile').then(m => m.UserProfile), canActivate: [() => inject(AdminAuthService).isLoggedUser()] },
  { 
    path: 'admin/dashboard', 
    loadComponent: () => import('./pages/admin-layout/admin-layout').then(m => m.AdminLayout), 
    canActivate: [AdminGuard],
    children: [
      { path: '', loadComponent: () => import('./pages/admin-dashboard/admin-dashboard').then(m => m.AdminDashboard) },
      { path: 'reports', loadComponent: () => import('./pages/admin-dashboard/admin-dashboard').then(m => m.AdminDashboard) },
      { path: 'orders', loadComponent: () => import('./pages/admin-orders/admin-orders').then(m => m.AdminOrders) },
      { path: 'products', loadComponent: () => import('./pages/admin-products/admin-products').then(m => m.AdminProducts) },
      { path: 'profile', loadComponent: () => import('./pages/admin-profile/admin-profile').then(m => m.AdminProfile) },
      { path: 'settings', loadComponent: () => import('./pages/admin-settings/admin-settings').then(m => m.AdminSettings) }
    ]
  }
];