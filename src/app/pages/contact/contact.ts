import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SITE_CONTENT } from '../../data/site-content';

@Component({
  selector: 'app-contact',
  imports: [CommonModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact implements OnInit {
  isLoading = true;
  info = SITE_CONTENT.companyInfo;

  ngOnInit() {
    setTimeout(() => {
      this.isLoading = false;
    }, 700);
  }
}
