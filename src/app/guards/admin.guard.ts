import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AdminAuthService } from '../services/admin-auth';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  
  constructor(private auth: AdminAuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.auth.isAdmin()) {
      return true;
    }
    
    // Not logged in as admin, block access
    this.router.navigate(['/login']);
    return false;
  }
}
