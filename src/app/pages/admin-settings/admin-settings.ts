import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-admin-settings',
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-settings.html',
  styleUrl: './admin-settings.css',
})
export class AdminSettings {
  info: any = {};
  banners: any[] = [];
  categories: any[] = [];
  
  constructor(private api: ApiService) {
    this.api.getSiteContent().subscribe(data => {
      if(data) {
         if(data.companyInfo) this.info = data.companyInfo;
         if(data.heroBanners) this.banners = data.heroBanners;
         if(data.categories) this.categories = data.categories;
      }
    });
  }

  addBanner() {
    this.banners.push({
      tagline: 'New Collection',
      headline: 'Luxury Baby Essentials',
      buttonText: 'Shop Now',
      buttonLink: '/shop',
      image: 'images/p1.jpg',
      bgColor: '#FDFCFB'
    });
  }

  removeBanner(index: number) {
    if (confirm('Are you sure you want to remove this banner?')) {
      this.banners.splice(index, 1);
    }
  }

  addCategory() {
    this.categories.push({
      name: 'New Category',
      image: 'images/p1.jpg',
      link: '/shop'
    });
  }

  removeCategory(index: number) {
    if (confirm('Are you sure you want to remove this category?')) {
      this.categories.splice(index, 1);
    }
  }

  uploadImage(event: any, section: string, index: number) {
    const file = event.target.files[0];
    if (file) {
      this.api.uploadSiteImage(section, index, file).subscribe(data => {
        if(section === 'banner') this.banners[index].image = data.imageUrl;
        if(section === 'category') this.categories[index].image = data.imageUrl;
      });
    }
  }

  saveChanges() {
    this.api.updateCompanyInfo(this.info).subscribe();
    this.api.updateBanners(this.banners).subscribe();
    this.api.updateCategories(this.categories).subscribe();
    alert('All settings saved to database!');
  }
}
