import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';
import { PRODUCTS } from '../../data/product';
import { Navbar } from '../../components/navbar/navbar';
import { TopBar } from '../../top-bar/top-bar';
import { Banner } from "../../components/banner/banner";
import { Category } from "../category/category";
import { ProductCardComponent } from "../../components/product-card/product-card";

@Component({
  selector: 'app-home',
  imports: [CommonModule, Navbar, TopBar, Banner, Category, ProductCardComponent],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
   
}
