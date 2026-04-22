import { Injectable, signal, Inject, PLATFORM_ID } from '@angular/core';

interface UserRecord { name: string; email: string; password: string; }
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthService {
  private adminKey  = 'lil_cradle_admin_logged_in';
  private usersKey  = 'lil_cradle_users';
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
    
    // Check registered users
    const users: UserRecord[] = JSON.parse(localStorage.getItem(this.usersKey) ?? '[]');
    const found = users.find(u => u.email === email && u.password === pass);
    if (found) {
      this.isLoggedUser.set(true);
      localStorage.setItem(this.userKey, 'true');
      return 'user';
    }

    return 'error';
  }

  registerUser(name: string, email: string, password: string): boolean {
    if (!isPlatformBrowser(this.platformId)) return false;
    const users: UserRecord[] = JSON.parse(localStorage.getItem(this.usersKey) ?? '[]');
    if (users.find(u => u.email === email)) return false; // already exists
    users.push({ name, email, password });
    localStorage.setItem(this.usersKey, JSON.stringify(users));
    return true;
  }

  logout() {
    this.isAdmin.set(false);
    this.isLoggedUser.set(false);
    localStorage.removeItem(this.adminKey);
    localStorage.removeItem(this.userKey);
  }
}
