import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-banner',
  imports: [CommonModule, RouterModule],
  templateUrl: './banner.html',
  styleUrl: './banner.css',
})
export class Banner implements OnInit, OnDestroy {
  banners: any[] = [];
  activeIndex = 0;
  private intervalId: any;

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.api.getSiteContent().subscribe(data => {
      if(data && data.heroBanners && data.heroBanners.length > 0) {
        this.banners = data.heroBanners;
        this.startTimer();
      }
    });
  }

  ngOnDestroy() {
    this.stopTimer();
  }

  startTimer() {
    this.intervalId = setInterval(() => {
      this.next();
    }, 5000);
  }

  stopTimer() {
    if (this.intervalId) clearInterval(this.intervalId);
  }

  next() {
    this.activeIndex = (this.activeIndex + 1) % this.banners.length;
  }

  setBanner(index: number) {
    this.activeIndex = index;
    this.stopTimer();
    this.startTimer(); // reset timer
  }
}
