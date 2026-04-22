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
  private touchStartX = 0;
  private touchEndX = 0;

  constructor(public api: ApiService) {}

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
    this.stopTimer();
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

  prev() {
    this.activeIndex = (this.activeIndex - 1 + this.banners.length) % this.banners.length;
  }

  setBanner(index: number) {
    this.activeIndex = index;
    this.startTimer();
  }

  // Swipe handlers
  onTouchStart(e: TouchEvent) {
    this.touchStartX = e.changedTouches[0].screenX;
  }

  onTouchEnd(e: TouchEvent) {
    this.touchEndX = e.changedTouches[0].screenX;
    this.handleSwipe();
  }

  private handleSwipe() {
    const threshold = 50;
    if (this.touchStartX - this.touchEndX > threshold) {
      this.next(); // Swiped left
      this.startTimer();
    } else if (this.touchEndX - this.touchStartX > threshold) {
      this.prev(); // Swiped right
      this.startTimer();
    }
  }
}
