import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SITE_CONTENT } from '../../data/site-content';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-features-bar',
  imports: [CommonModule],
  templateUrl: './features-bar.html',
  styleUrl: './features-bar.css',
})
export class FeaturesBar {
  features = SITE_CONTENT.features;

  constructor(public sanitizer: DomSanitizer) {}
}
