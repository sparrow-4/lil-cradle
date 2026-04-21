import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';
import { PRODUCTS } from '../../data/product';
import { Navbar } from '../../components/navbar/navbar';
import { TopBar } from '../../top-bar/top-bar';

@Component({
  selector: 'app-home',
  imports: [CommonModule,Navbar,TopBar],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
   products = PRODUCTS;
}
