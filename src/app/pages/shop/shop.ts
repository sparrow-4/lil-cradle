import { Component, OnInit, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CartService } from '../../services/cart';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-shop',
  imports: [CommonModule, RouterModule],
  templateUrl: './shop.html',
  styleUrl: './shop.css',
})
export class Shop implements OnInit {
  allProducts = signal<any[]>([]);
  activeCategory = signal<string>('all');
  searchQuery = signal<string>('');
  isLoading = true;

  filteredProducts = computed(() => {
    let products = this.allProducts();
    const cat = this.activeCategory();
    const q = this.searchQuery().toLowerCase();

    if (cat !== 'all') {
      products = products.filter(p => p.category?.toLowerCase() === cat.toLowerCase());
    }

    if (q) {
      products = products.filter(p => 
        p.name?.toLowerCase().includes(q) || 
        p.category?.toLowerCase().includes(q)
      );
    }

    return products;
  });

  constructor(
    private cart: CartService, 
    public api: ApiService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.activeCategory.set(params['category'] || 'all');
      this.searchQuery.set(params['q'] || '');
    });

    this.api.getProducts().subscribe({
      next: (data) => {
        this.allProducts.set(data);
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Failed to load products', err);
        this.isLoading = false;
      }
    });
  }

  addToCart(p: any) {
    this.cart.addToCart(p);
  }
}
