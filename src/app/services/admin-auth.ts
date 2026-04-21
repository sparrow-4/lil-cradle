import { Injectable, signal, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthService {
  private adminKey = 'lil_cradle_admin_logged_in';
  private userKey = 'lil_cradle_user_logged_in';
  
  isAdmin = signal<boolean>(false);
  isLoggedUser = signal<boolean>(false);

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.isAdmin.set(localStorage.getItem(this.adminKey) === 'true');
      this.isLoggedUser.set(localStorage.getItem(this.userKey) === 'true');
    }
  }

  login(email: string, pass: string): 'admin' | 'user' | 'error' {
    if (email === 'admin@gmail.com' && pass === 'admin123') {
      this.isAdmin.set(true);
      localStorage.setItem(this.adminKey, 'true');
      return 'admin';
    } 
    
    // Any other credentials count as a User login
    if (email && pass) {
      this.isLoggedUser.set(true);
      localStorage.setItem(this.userKey, 'true');
      return 'user';
    }

    return 'error';
  }

  logout() {
    this.isAdmin.set(false);
    this.isLoggedUser.set(false);
    localStorage.removeItem(this.adminKey);
    localStorage.removeItem(this.userKey);
  }
}
