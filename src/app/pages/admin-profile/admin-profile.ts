import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminAuthService } from '../../services/admin-auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-profile',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="p-6 lg:p-8">
      <div class="max-w-4xl">
        <header class="mb-10">
          <h1 class="text-3xl font-serif text-[#3D2B1F] mb-2">Administrator Profile</h1>
          <p class="text-[#8E6E37]">Manage your administrative credentials and settings</p>
        </header>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- Profile Card -->
          <div class="lg:col-span-2 space-y-8">
            <div class="bg-white rounded-[2rem] p-8 shadow-sm border border-[#F5E6D3]">
              <div class="flex items-center gap-6 mb-10 pb-10 border-b border-[#F5E6D3]/50">
                <div class="w-24 h-24 rounded-2xl bg-gradient-to-br from-[#3D2B1F] to-[#1A120B] flex items-center justify-center text-white text-3xl font-serif shadow-lg">
                  {{ (auth.currentUser()?.name || 'A')[0].toUpperCase() }}
                </div>
                <div>
                  <h2 class="text-2xl font-serif text-[#3D2B1F]">{{ auth.currentUser()?.name }}</h2>
                  <p class="text-[#C5A059] font-medium tracking-widest uppercase text-xs">System Administrator</p>
                </div>
              </div>

              <form class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label class="block text-xs uppercase tracking-widest text-[#8E6E37] font-bold mb-2">Display Name</label>
                  <input type="text" [value]="auth.currentUser()?.name" class="w-full px-4 py-3 rounded-xl border border-[#F5E6D3] bg-[#FDFCFB] text-[#3D2B1F] focus:outline-none focus:ring-2 focus:ring-[#C5A059]/20 transition-all">
                </div>
                <div>
                  <label class="block text-xs uppercase tracking-widest text-[#8E6E37] font-bold mb-2">Email Address</label>
                  <input type="email" [value]="auth.currentUser()?.email" readonly class="w-full px-4 py-3 rounded-xl border border-[#F5E6D3] bg-[#F5E6D3]/20 text-[#3D2B1F] focus:outline-none cursor-not-allowed">
                </div>
                <div class="md:col-span-2 pt-4">
                  <button type="button" class="px-8 py-3 rounded-xl bg-[#3D2B1F] text-white font-medium hover:bg-[#1A120B] transition-all duration-300 shadow-lg shadow-[#3D2B1F]/20">
                    Save Profile Changes
                  </button>
                </div>
              </form>
            </div>

            <!-- Security Section -->
            <div class="bg-white rounded-[2rem] p-8 shadow-sm border border-[#F5E6D3]">
              <h3 class="text-xl font-serif text-[#3D2B1F] mb-6">Account Security</h3>
              <div class="space-y-4">
                <div class="flex items-center justify-between p-4 rounded-xl border border-[#F5E6D3] hover:border-[#C5A059]/50 transition-colors cursor-pointer group">
                  <div class="flex items-center gap-4">
                    <div class="w-10 h-10 rounded-lg bg-[#FDFCFB] flex items-center justify-center border border-[#F5E6D3]">
                      <span class="material-icons text-[#C5A059] text-sm">lock</span>
                    </div>
                    <div>
                      <p class="text-sm font-medium text-[#3D2B1F]">Update Password</p>
                      <p class="text-xs text-gray-400">Keep your account secure</p>
                    </div>
                  </div>
                  <span class="material-icons text-gray-300 group-hover:text-[#C5A059] transition-colors">chevron_right</span>
                </div>
                
                <div class="flex items-center justify-between p-4 rounded-xl border border-[#F5E6D3] hover:border-[#C5A059]/50 transition-colors cursor-pointer group">
                  <div class="flex items-center gap-4">
                    <div class="w-10 h-10 rounded-lg bg-[#FDFCFB] flex items-center justify-center border border-[#F5E6D3]">
                      <span class="material-icons text-[#C5A059] text-sm">security</span>
                    </div>
                    <div>
                      <p class="text-sm font-medium text-[#3D2B1F]">Two-Factor Authentication</p>
                      <p class="text-xs text-gray-400">Currently disabled</p>
                    </div>
                  </div>
                  <span class="material-icons text-gray-300 group-hover:text-[#C5A059] transition-colors">chevron_right</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Quick Stats Sidebar -->
          <div class="space-y-8">
            <div class="bg-gradient-to-br from-[#C5A059] to-[#8E6E37] rounded-[2rem] p-8 text-white shadow-xl">
              <h3 class="text-lg font-serif mb-6">Activity Summary</h3>
              <div class="space-y-6">
                <div>
                  <p class="text-white/60 text-xs uppercase tracking-widest font-bold mb-1">Last Login</p>
                  <p class="font-medium text-sm">Today, 02:15 PM</p>
                </div>
                <div>
                  <p class="text-white/60 text-xs uppercase tracking-widest font-bold mb-1">Logins this month</p>
                  <p class="font-medium text-sm">24 Sessions</p>
                </div>
                <div>
                  <p class="text-white/60 text-xs uppercase tracking-widest font-bold mb-1">Security Status</p>
                  <div class="flex items-center gap-2 mt-1">
                    <div class="w-2 h-2 rounded-full bg-green-400"></div>
                    <p class="font-medium text-xs">Strong Protection</p>
                  </div>
                </div>
              </div>
            </div>

            <div class="bg-red-50 rounded-[2rem] p-8 border border-red-100">
              <h3 class="text-lg font-serif text-red-900 mb-4">Danger Zone</h3>
              <p class="text-xs text-red-700 mb-6 leading-relaxed">Sign out of all sessions or deactivate your administrative access.</p>
              <button (click)="logout()" class="w-full py-3 rounded-xl bg-red-600 text-white font-medium hover:bg-red-700 transition-all duration-300">
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host { display: block; }
  `]
})
export class AdminProfile {
  auth = inject(AdminAuthService);
  router = inject(Router);

  logout() {
    this.auth.logout();
    this.router.navigate(['/']);
  }
}
