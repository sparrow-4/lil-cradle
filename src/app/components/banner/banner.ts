import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SITE_CONTENT } from '../../data/site-content';

@Component({
  selector: 'app-banner',
  imports: [CommonModule, RouterModule],
  templateUrl: './banner.html',
  styleUrl: './banner.css',
})
export class Banner implements OnInit, OnDestroy {
  banners = SITE_CONTENT.heroBanners;
  activeIndex = 0;
  private intervalId: any;

  ngOnInit() {
    this.startTimer();
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
