import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PRODUCTS } from '../../data/product';

@Component({
  selector: 'app-admin-products',
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-products.html',
  styleUrl: './admin-products.css',
})
export class AdminProducts {
  products = PRODUCTS;
}
