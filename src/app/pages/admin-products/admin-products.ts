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

  constructor(public api: ApiService) {
    this.api.getProducts().subscribe(data => this.products = data);
  }

  saveAll() {
    this.api.bulkUpdateProducts(this.products).subscribe(() => {
      alert('All products saved successfully!');
    });
  }

  addProduct() {
    const newProduct = {
      name: 'New Product',
      price: 0,
      oldPrice: null,
      type: 'featured',
      rating: 5,
      sale: false
    };
    this.api.createProduct(newProduct).subscribe({
      next: (data) => {
        this.products = [data, ...this.products];
      },
      error: (err) => {
        alert('Failed to add product: ' + err.message);
      }
    });
  }

  deleteProduct(id: string) {
    if(confirm("Are you sure you want to delete this product?")) {
      this.api.deleteProduct(id).subscribe(() => {
        this.products = this.products.filter(p => p._id !== id);
      });
    }
  }

  uploadImage(event: any, product: any) {
    const file = event.target.files[0];
    if (file && product._id) {
      this.api.uploadProductImage(product._id, file).subscribe(data => {
        product.image = data.imageUrl;
      });
    } else if (file) {
      alert('Please save the new product first before uploading an image.');
    }
  }
}
