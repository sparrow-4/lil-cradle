import { Component, signal, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Navbar } from './components/navbar/navbar';
import { TopBar } from './top-bar/top-bar';
import { Footer } from './components/footer/footer';
import { LucideAngularModule, ChevronUp } from 'lucide-angular';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, TopBar, Footer, CommonModule, LucideAngularModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('lil-cradle');
  
  showScrollTop = false;
  iconUp = ChevronUp;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.showScrollTop = window.scrollY > 300;
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
