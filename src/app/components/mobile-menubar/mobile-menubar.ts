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

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  icons = {
    cart: ShoppingCart,
    search: Search,
    menu: Menu,
    close: X 
  };
}
