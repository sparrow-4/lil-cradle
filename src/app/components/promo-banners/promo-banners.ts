import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SITE_CONTENT } from '../../data/site-content';

@Component({
  selector: 'app-promo-banners',
  imports: [CommonModule, RouterModule],
  templateUrl: './promo-banners.html',
  styleUrl: './promo-banners.css',
})
export class PromoBanners {
  promos = SITE_CONTENT.promoBanners;
}
