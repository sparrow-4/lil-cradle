import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { LucideAngularModule, ShoppingCart, Search, Menu, X } from 'lucide-angular';
import { AdminAuthService } from '../../services/admin-auth';

@Component({
  selector: 'app-mobile-menubar',
  imports: [RouterModule, LucideAngularModule,CommonModule],
  templateUrl: './mobile-menubar.html',
  styleUrl: './mobile-menubar.css',
})
export class MobileMenubar {
  
  constructor(public auth: AdminAuthService, private router: Router) {}
  
  isMenuOpen = false;
isReady = false;

ngOnInit() {
  const saved = localStorage.getItem('menuOpen');
  this.isMenuOpen = saved === 'true';

  this.isReady = true; 
}

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;

    // save state
    localStorage.setItem('menuOpen', String(this.isMenuOpen));
  }

  logout() {
    this.auth.logout();
    this.toggleMenu();
    this.router.navigate(['/login']);
  }

  icons = {
    cart: ShoppingCart,
    search: Search,
    menu: Menu,
    close: X 
  };
}
