import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SITE_CONTENT } from '../../data/site-content';

@Component({
  selector: 'app-category',
  imports: [CommonModule, RouterModule],
  templateUrl: './category.html',
  styleUrl: './category.css',
})
export class Category {
  categories = SITE_CONTENT.categories;
}
