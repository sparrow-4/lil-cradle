import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-custom-cta',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './custom-cta.html',
  styleUrl: './custom-cta.css',
})
export class CustomCta {
  whatsapp = '';
  promo: any = null;
  
  constructor(private api: ApiService) {
    this.api.getSiteContent().subscribe(data => {
      if(data) {
        if(data.companyInfo) this.whatsapp = data.companyInfo.whatsapp;
        if(data.promoBanners && data.promoBanners.length > 0) {
          this.promo = data.promoBanners[0];
        }
      }
    });
  }
}
