import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { LucideAngularModule, ShoppingCart, Search, Menu, User } from 'lucide-angular';
import { MobileMenubar } from "../mobile-menubar/mobile-menubar";
import { CartService } from "../../services/cart";
import { AdminAuthService } from "../../services/admin-auth";
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, LucideAngularModule, CommonModule, MobileMenubar, FormsModule],
  templateUrl: './navbar.html',
})
export class Navbar {

  isMenuOpen = false;
  searchQuery = '';
  searchResults: any[] = [];
  isSearchOpen = false;

  constructor(
    public cart: CartService, 
    public auth: AdminAuthService, 
    private router: Router,
    private api: ApiService
  ) {}

  onSearchInput() {
    const q = this.searchQuery.trim().toLowerCase();
    if (q.length > 1) {
      this.api.getProducts().subscribe((products: any[]) => {
        this.searchResults = products.filter((p: any) => 
          p.name.toLowerCase().includes(q) || 
          p.category?.toLowerCase().includes(q)
        ).slice(0, 5); // Show top 5
        this.isSearchOpen = true;
      });
    } else {
      this.searchResults = [];
      this.isSearchOpen = false;
    }
  }

  onSearch() {
    if (this.searchQuery.trim()) {
      this.router.navigate(['/shop'], { queryParams: { q: this.searchQuery } });
      this.searchQuery = '';
      this.isSearchOpen = false;
    }
  }

  goToProduct(id: string) {
    this.router.navigate(['/product', id]);
    this.searchQuery = '';
    this.isSearchOpen = false;
  }

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
