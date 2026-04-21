import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { AdminAuthService } from '../../services/admin-auth';

@Component({
  selector: 'app-admin-login',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './admin-login.html',
  styleUrl: './admin-login.css',
})
export class AdminLogin {
  email = '';
  password = '';
  error = '';

  constructor(private auth: AdminAuthService, private router: Router) {}

  login() {
    const result = this.auth.login(this.email, this.password);
    
    if (result === 'admin') {
      this.router.navigate(['/admin/dashboard']);
    } else if (result === 'user') {
      this.router.navigate(['/']);
    } else {
      this.error = 'Invalid credentials provided.';
    }
  }
}
