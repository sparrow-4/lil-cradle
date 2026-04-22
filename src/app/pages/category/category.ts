import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-category',
  imports: [CommonModule, RouterModule],
  templateUrl: './category.html',
  styleUrl: './category.css',
})
export class Category {
  categories: any[] = [];
  constructor(public api: ApiService) {
    this.api.getSiteContent().subscribe(data => {
      if(data && data.categories) {
         this.categories = data.categories;
      }
    });
  }
}
