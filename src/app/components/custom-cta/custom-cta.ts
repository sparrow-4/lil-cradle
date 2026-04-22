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
  
  constructor(private api: ApiService) {
    this.api.getSiteContent().subscribe(data => {
      if(data && data.companyInfo) {
        this.whatsapp = data.companyInfo.whatsapp;
      }
    });
  }
}
