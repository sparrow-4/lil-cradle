import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-category',
  imports: [CommonModule],
  templateUrl: './category.html',
  styleUrl: './category.css',
})
export class Category {


  categories = [
  { name: 'Playsets', image: 'images/img1.png' },
  { name: 'Control Toys', image: 'images/img1.png' },
  { name: 'Educational Toys', image: 'images/img1.png' },
  { name: 'Eco-Friendly', image: 'images/img1.png' },
  { name: 'Stuffed Toys', image: 'images/img1.png' }
];
}
