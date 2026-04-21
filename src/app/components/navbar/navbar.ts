import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LucideAngularModule, ShoppingCart, Search, Menu } from 'lucide-angular';
import { MobileMenubar } from "../mobile-menubar/mobile-menubar";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, LucideAngularModule, CommonModule, MobileMenubar],
  templateUrl: './navbar.html',
})
export class Navbar {

  isMenuOpen = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  icons = {
    cart: ShoppingCart,
    search: Search,
    menu: Menu
  };
}
