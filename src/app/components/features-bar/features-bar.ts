import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-features-bar',
  imports: [CommonModule],
  templateUrl: './features-bar.html',
  styleUrl: './features-bar.css',
})
export class FeaturesBar {
  features: any[] = [];

  constructor(public sanitizer: DomSanitizer, private api: ApiService) {
    this.api.getSiteContent().subscribe(data => {
      if (data && data.features) {
        this.features = data.features;
      }
    });
  }
}
