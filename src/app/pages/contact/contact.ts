import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SITE_CONTENT } from '../../data/site-content';

@Component({
  selector: 'app-contact',
  imports: [CommonModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {
  info = SITE_CONTENT.companyInfo;
}
