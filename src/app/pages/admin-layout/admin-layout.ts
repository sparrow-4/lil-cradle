import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AdminAuthService } from '../../services/admin-auth';

@Component({
  selector: 'app-admin-layout',
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-layout.html',
  styleUrl: './admin-layout.css',
})
export class AdminLayout {
  sidebarOpen = false;

  toggleSidebar() { this.sidebarOpen = !this.sidebarOpen; }
  constructor(public auth: AdminAuthService, private router: Router) {}

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
