import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AdminAuthService } from '../../services/admin-auth';

@Component({
  selector: 'app-register',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  name = '';
  email = '';
  countryCode = '+91';
  phone = '';
  password = '';
  confirmPassword = '';
  error = '';
  success = '';
  loading = false;
  showPassword = false;
  showConfirm = false;
  otpSent = false;
  otpCode = '';
  isOtpVerified = false;
  otpLoading = false;

  countryCodes = [
    { code: '+91', name: 'India' },
    { code: '+1', name: 'USA' },
    { code: '+44', name: 'UK' },
    { code: '+971', name: 'UAE' },
    { code: '+65', name: 'Singapore' },
    { code: '+61', name: 'Australia' }
  ];

  constructor(private auth: AdminAuthService, private router: Router) {}

  togglePassword() { this.showPassword = !this.showPassword; }
  toggleConfirm() { this.showConfirm = !this.showConfirm; }

  sendOtp() {
    if (!this.phone.trim()) {
      this.error = 'Please enter a phone number first.';
      return;
    }
    this.otpLoading = true;
    this.error = '';
    
    // Simulate sending OTP
    setTimeout(() => {
      this.otpLoading = false;
      this.otpSent = true;
      this.success = 'OTP sent to ' + this.countryCode + ' ' + this.phone;
      // In a real app, you'd call a backend service here
    }, 1200);
  }

  verifyOtp() {
    if (this.otpCode === '123456') { // Mock OTP for testing
      this.isOtpVerified = true;
      this.success = 'Phone number verified successfully!';
      this.error = '';
    } else {
      this.error = 'Invalid OTP. Please try again (Tip: use 123456).';
    }
  }

  register() {
    this.error = '';
    this.success = '';

    if (!this.name.trim() || !this.email.trim() || !this.phone.trim() || !this.password || !this.confirmPassword) {
      this.error = 'Please fill in all fields.';
      return;
    }

    if (!this.isOtpVerified) {
      this.error = 'Please verify your phone number with OTP first.';
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.error = 'Passwords do not match.';
      return;
    }

    if (this.password.length < 6) {
      this.error = 'Password must be at least 6 characters.';
      return;
    }

    this.loading = true;

    // Simulate async registration (replace with real API call)
    setTimeout(() => {
      this.loading = false;
      const fullPhone = this.countryCode + ' ' + this.phone;
      const registered = this.auth.registerUser(this.name, this.email, fullPhone, this.password);
      if (!registered) {
        this.error = 'Email or phone already registered.';
        return;
      }
      this.success = 'Account created! Redirecting to login…';
      setTimeout(() => this.router.navigate(['/login']), 1500);
    }, 900);
  }
}
