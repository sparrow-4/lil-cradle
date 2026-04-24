import { Component, signal, HostListener, inject } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Navbar } from './components/navbar/navbar';
import { TopBar } from './top-bar/top-bar';
import { Footer } from './components/footer/footer';
import { ToastContainer } from './components/toast/toast';
import { LucideAngularModule, ChevronUp } from 'lucide-angular';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, TopBar, Footer, ToastContainer, CommonModule, LucideAngularModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('lil-cradle');
  private router = inject(Router);
  
  showScrollTop = false;
  isAdmin = false;
  iconUp = ChevronUp;

  constructor() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.isAdmin = event.url.startsWith('/admin') || 
                     event.url.startsWith('/login') || 
                     event.url.startsWith('/register');
    });
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.showScrollTop = window.scrollY > 300;
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
