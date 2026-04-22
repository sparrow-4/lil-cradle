import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LucideAngularModule, ShoppingCart, Search, Menu, User } from 'lucide-angular';
import { MobileMenubar } from "../mobile-menubar/mobile-menubar";
import { CartService } from "../../services/cart";
import { AdminAuthService } from "../../services/admin-auth";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, LucideAngularModule, CommonModule, MobileMenubar],
  templateUrl: './navbar.html',
})
export class Navbar {

  isMenuOpen = false;

  constructor(public cart: CartService, public auth: AdminAuthService) {}

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  icons = {
    cart: ShoppingCart,
    search: Search,
    menu: Menu,
    user: User
  };
}
