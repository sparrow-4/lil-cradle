import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LucideAngularModule, ShoppingCart, Search, Menu, X } from 'lucide-angular';

@Component({
  selector: 'app-mobile-menubar',
  imports: [RouterModule, LucideAngularModule,CommonModule],
  templateUrl: './mobile-menubar.html',
  styleUrl: './mobile-menubar.css',
})
export class MobileMenubar {
  
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

  icons = {
    cart: ShoppingCart,
    search: Search,
    menu: Menu,
    close: X 
  };
}
