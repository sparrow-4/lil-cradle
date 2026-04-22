import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';
import { PRODUCTS } from '../../data/product';
import { Banner } from "../../components/banner/banner";
import { Category } from "../category/category";
import { ProductCardComponent } from "../../components/product-card/product-card";
import { PromoBanners } from "../../components/promo-banners/promo-banners";
import { FeaturesBar } from "../../components/features-bar/features-bar";
import { CustomCta } from "../../components/custom-cta/custom-cta";

@Component({
  selector: 'app-home',
  imports: [CommonModule, Banner, Category, PromoBanners, ProductCardComponent, FeaturesBar, CustomCta],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
   
}
