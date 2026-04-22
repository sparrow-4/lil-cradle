import { Injectable, signal, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export interface UserRecord { name: string; email: string; password?: string; role: 'admin' | 'user'; }

@Injectable({
  providedIn: 'root'
})
export class AdminAuthService {
  private adminKey  = 'lil_cradle_admin_logged_in';
  private usersKey  = 'lil_cradle_users';
  private userKey = 'lil_cradle_user_logged_in';
  private currentUserKey = 'lil_cradle_current_user';
  
  isAdmin = signal<boolean>(false);
  isLoggedUser = signal<boolean>(false);
  currentUser = signal<UserRecord | null>(null);

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.isAdmin.set(localStorage.getItem(this.adminKey) === 'true');
      this.isLoggedUser.set(localStorage.getItem(this.userKey) === 'true');
      const user = localStorage.getItem(this.currentUserKey);
      if (user) {
        this.currentUser.set(JSON.parse(user));
      }
    }
  }

  login(email: string, pass: string): 'admin' | 'user' | 'error' {
    if (email === 'admin@gmail.com' && pass === 'admin123') {
      const admin: UserRecord = { name: 'Admin', email: 'admin@gmail.com', role: 'admin' };
      this.isAdmin.set(true);
      this.currentUser.set(admin);
      localStorage.setItem(this.adminKey, 'true');
      localStorage.setItem(this.currentUserKey, JSON.stringify(admin));
      return 'admin';
    } 
    
    // Check registered users
    const users: UserRecord[] = JSON.parse(localStorage.getItem(this.usersKey) ?? '[]');
    const found = users.find(u => u.email === email && u.password === pass);
    if (found) {
      const user: UserRecord = { name: found.name, email: found.email, role: 'user' };
      this.isLoggedUser.set(true);
      this.currentUser.set(user);
      localStorage.setItem(this.userKey, 'true');
      localStorage.setItem(this.currentUserKey, JSON.stringify(user));
      return 'user';
    }

    return 'error';
  }

  registerUser(name: string, email: string, password: string): boolean {
    if (!isPlatformBrowser(this.platformId)) return false;
    const users: any[] = JSON.parse(localStorage.getItem(this.usersKey) ?? '[]');
    if (users.find(u => u.email === email)) return false; // already exists
    users.push({ name, email, password, role: 'user' });
    localStorage.setItem(this.usersKey, JSON.stringify(users));
    return true;
  }

  logout() {
    this.isAdmin.set(false);
    this.isLoggedUser.set(false);
    this.currentUser.set(null);
    localStorage.removeItem(this.adminKey);
    localStorage.removeItem(this.userKey);
    localStorage.removeItem(this.currentUserKey);
  }

  updateProfile(updatedUser: Partial<UserRecord>) {
    const current = this.currentUser();
    if (current) {
      const newUser = { ...current, ...updatedUser };
      this.currentUser.set(newUser);
      localStorage.setItem(this.currentUserKey, JSON.stringify(newUser));
      
      // Also update in users list if it's a regular user
      if (newUser.role === 'user') {
        const users: any[] = JSON.parse(localStorage.getItem(this.usersKey) ?? '[]');
        const index = users.findIndex(u => u.email === current.email);
        if (index !== -1) {
          users[index] = { ...users[index], ...updatedUser };
          localStorage.setItem(this.usersKey, JSON.stringify(users));
        }
      }
    }
  }
}
