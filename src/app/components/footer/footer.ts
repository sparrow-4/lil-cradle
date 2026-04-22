import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-footer',
  imports: [CommonModule, RouterModule],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {
  info: any = {};
  constructor(private api: ApiService) {
    this.api.getSiteContent().subscribe(data => {
      if(data && data.companyInfo) {
        this.info = data.companyInfo;
      }
    });
  }
}
