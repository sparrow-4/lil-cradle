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
  constructor(private api: ApiService) {
    this.api.getSiteContent().subscribe(data => {
      if(data && data.promoBanners) {
        this.promos = data.promoBanners;
      }
    });
  }
}
