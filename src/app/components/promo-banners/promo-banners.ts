import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-promo-banners',
  imports: [CommonModule, RouterModule],
  templateUrl: './promo-banners.html',
  styleUrl: './promo-banners.css',
})
export class PromoBanners {
  promos: any[] = [];
  constructor(public api: ApiService) {
    this.api.getSiteContent().subscribe(data => {
      if(data && data.promoBanners && data.promoBanners.length > 0) {
        this.promos = data.promoBanners;
      } else {
        // Default data requested by user
        this.promos = [
          {
            tag: 'New Arrivals',
            headline: 'Traditional Cradle Kits',
            buttonText: 'Shop Now',
            image: '/images/p1.jpg',
            bgColor: '#F3F9FB',
            tagColor: '#0F83B2',
            buttonBg: '#0F83B2'
          },
          {
            tag: 'Customizable',
            headline: 'Handmade Luxury Hampers',
            buttonText: 'Customize Now',
            image: '/images/img1.png',
            bgColor: '#FDF7F2',
            tagColor: '#C49A4A',
            buttonBg: '#C49A4A'
          }
        ];
      }
    });
  }
}
