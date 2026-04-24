import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-admin-products',
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-products.html',
  styleUrl: './admin-products.css',
})
export class AdminProducts {
  products: any[] = [];
  filteredProducts: any[] = [];
  searchQuery: string = '';
  filterCategory: string = '';
  filterType: string = '';

  // Modal/Drawer State
  isDrawerOpen: boolean = false;
  isAddModalOpen: boolean = false;
  editingProduct: any = null;
  newProduct: any = this.resetNewProduct();

  // Selection
  selectedProductIds: Set<string> = new Set();

  constructor(public api: ApiService) {
    this.loadProducts();
  }

  loadProducts() {
    this.api.getProducts().subscribe(data => {
      this.products = data;
      this.applyFilters();
    });
  }

  applyFilters() {
    this.filteredProducts = this.products.filter(p => {
      const q = this.searchQuery.toLowerCase();
      const matchesSearch = (p.name?.toLowerCase().includes(q)) || 
                           (p.category?.toLowerCase().includes(q));
      
      const matchesCategory = !this.filterCategory || 
                             p.category?.toLowerCase() === this.filterCategory.toLowerCase();
      
      const matchesType = !this.filterType || p.type === this.filterType;
      
      return matchesSearch && matchesCategory && matchesType;
    });
  }

  resetNewProduct() {
    return {
      name: '',
      price: 0,
      costPrice: 0,
      oldPrice: null,
      type: 'featured',
      category: 'Uncategorized',
      rating: 5,
      sale: false,
      isCustomizable: false,
      customNameLabel: 'Baby Name',
      customMessageLabel: 'Gift Message',
      colorVariants: [],
      sizeVariants: [],
      customizationPrice: 0
    };
  }

  openAddModal() {
    this.newProduct = this.resetNewProduct();
    this.isAddModalOpen = true;
  }

  closeAddModal() {
    this.isAddModalOpen = false;
  }

  createProduct() {
    this.api.createProduct(this.newProduct).subscribe({
      next: (data) => {
        this.products = [data, ...this.products];
        this.applyFilters();
        this.closeAddModal();
      },
      error: (err) => alert('Failed to add product: ' + err.message)
    });
  }

  openEditDrawer(product: any) {
    this.editingProduct = JSON.parse(JSON.stringify(product)); // Deep clone
    this.isDrawerOpen = true;
  }

  closeDrawer() {
    this.isDrawerOpen = false;
    this.editingProduct = null;
  }

  saveProduct() {
    if (!this.editingProduct) return;
    this.api.updateProduct(this.editingProduct._id, this.editingProduct).subscribe(() => {
      const index = this.products.findIndex(p => p._id === this.editingProduct._id);
      if (index !== -1) {
        this.products[index] = this.editingProduct;
        this.applyFilters();
      }
      this.closeDrawer();
    });
  }

  deleteProduct(id: string) {
    if(confirm("Are you sure you want to delete this product?")) {
      this.api.deleteProduct(id).subscribe(() => {
        this.products = this.products.filter(p => p._id !== id);
        this.applyFilters();
      });
    }
  }

  uploadImage(event: any, product: any) {
    const file = event.target.files[0];
    if (file && product._id) {
      this.api.uploadProductImage(product._id, file).subscribe(data => {
        product.image = data.imageUrl;
        this.applyFilters();
      });
    }
  }

  toggleSelection(id: string) {
    if (this.selectedProductIds.has(id)) {
      this.selectedProductIds.delete(id);
    } else {
      this.selectedProductIds.add(id);
    }
  }

  selectAll() {
    if (this.selectedProductIds.size === this.filteredProducts.length) {
      this.selectedProductIds.clear();
    } else {
      this.filteredProducts.forEach(p => this.selectedProductIds.add(p._id));
    }
  }

  addVariant(type: 'color' | 'size', input: HTMLInputElement) {
    const val = input.value.trim();
    if (!val || !this.editingProduct) return;
    
    if (type === 'color') {
      this.editingProduct.colorVariants = [...(this.editingProduct.colorVariants || []), val];
    } else {
      this.editingProduct.sizeVariants = [...(this.editingProduct.sizeVariants || []), val];
    }
    input.value = '';
  }

  removeVariant(type: 'color' | 'size', index: number) {
    if (!this.editingProduct) return;
    if (type === 'color') {
      this.editingProduct.colorVariants.splice(index, 1);
    } else {
      this.editingProduct.sizeVariants.splice(index, 1);
    }
  }

  getDiscount(product: any): number {
    if (!product.oldPrice || product.oldPrice <= product.price) return 0;
    return Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100);
  }
}
