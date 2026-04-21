import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SITE_CONTENT } from '../../data/site-content';

@Component({
  selector: 'app-admin-settings',
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-settings.html',
  styleUrl: './admin-settings.css',
})
export class AdminSettings {
  info = SITE_CONTENT.companyInfo;

  saveChanges() {
    alert('Settings successfully updated in live memory!');
  }
}
