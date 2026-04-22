import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminAuthService } from '../../services/admin-auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="min-h-screen bg-[#FDFCFB] pt-32 pb-20 px-6">
      <div class="max-w-4xl mx-auto">
        <!-- Profile Header -->
        <div class="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-[#F5E6D3] mb-8 relative overflow-hidden">
          <div class="absolute top-0 right-0 w-64 h-64 bg-[#C5A059] opacity-5 rounded-full -mr-32 -mt-32"></div>
          
          <div class="flex flex-col md:flex-row items-center gap-8 relative z-10">
            <div class="w-32 h-32 rounded-full bg-gradient-to-br from-[#C5A059] to-[#8E6E37] flex items-center justify-center text-white text-4xl font-serif shadow-xl border-4 border-white">
              {{ (auth.currentUser()?.name || 'U')[0].toUpperCase() }}
            </div>
            
            <div class="flex-1 text-center md:text-left">
              <h1 class="text-3xl md:text-4xl font-serif text-[#3D2B1F] mb-2">{{ auth.currentUser()?.name }}</h1>
              <p class="text-[#8E6E37] font-medium tracking-wide uppercase text-sm mb-4">Member Since April 2026</p>
              <div class="flex flex-wrap justify-center md:justify-start gap-4">
                <button (click)="logout()" class="px-6 py-2 rounded-full bg-red-50 text-red-600 text-sm font-medium hover:bg-red-100 transition-colors duration-300">
                  Logout Account
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Dashboard Grid -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- Personal Info -->
          <div class="md:col-span-2 space-y-8">
            <div class="bg-white rounded-[2rem] p-8 shadow-sm border border-[#F5E6D3]">
              <h2 class="text-2xl font-serif text-[#3D2B1F] mb-6">Personal Information</h2>
              <div class="space-y-6">
                <div>
                  <label class="block text-xs uppercase tracking-widest text-[#8E6E37] font-bold mb-2">Full Name</label>
                  <p class="text-lg text-[#3D2B1F] font-medium">{{ auth.currentUser()?.name }}</p>
                </div>
                <div>
                  <label class="block text-xs uppercase tracking-widest text-[#8E6E37] font-bold mb-2">Email Address</label>
                  <p class="text-lg text-[#3D2B1F] font-medium">{{ auth.currentUser()?.email }}</p>
                </div>
                <div>
                  <label class="block text-xs uppercase tracking-widest text-[#8E6E37] font-bold mb-2">Account Type</label>
                  <p class="text-lg text-[#3D2B1F] font-medium capitalize">{{ auth.currentUser()?.role }} Account</p>
                </div>
              </div>
            </div>

            <!-- Recent Orders (Placeholder) -->
            <div class="bg-white rounded-[2rem] p-8 shadow-sm border border-[#F5E6D3]">
              <div class="flex justify-between items-center mb-6">
                <h2 class="text-2xl font-serif text-[#3D2B1F]">Recent Orders</h2>
                <a routerLink="/shop" class="text-[#C5A059] text-sm font-medium hover:underline">View All</a>
              </div>
              
              <div class="flex flex-col items-center justify-center py-12 text-center">
                <div class="w-16 h-16 bg-[#FDFCFB] rounded-full flex items-center justify-center mb-4">
                  <span class="material-icons text-[#C5A059]">shopping_bag</span>
                </div>
                <p class="text-[#3D2B1F] font-medium mb-1">No orders yet</p>
                <p class="text-gray-400 text-sm">Start shopping our luxury collection today.</p>
              </div>
            </div>
          </div>

          <!-- Sidebar / Quick Stats -->
          <div class="space-y-8">
            <div class="bg-gradient-to-br from-[#3D2B1F] to-[#1A120B] rounded-[2rem] p-8 text-white shadow-xl">
              <h3 class="text-xl font-serif mb-6">Membership Perk</h3>
              <div class="space-y-4">
                <div class="flex items-center gap-4 p-3 rounded-xl bg-white/5 border border-white/10">
                  <div class="w-10 h-10 rounded-lg bg-[#C5A059]/20 flex items-center justify-center">
                    <span class="material-icons text-[#C5A059] text-sm">local_shipping</span>
                  </div>
                  <p class="text-sm">Free Express Shipping</p>
                </div>
                <div class="flex items-center gap-4 p-3 rounded-xl bg-white/5 border border-white/10">
                  <div class="w-10 h-10 rounded-lg bg-[#C5A059]/20 flex items-center justify-center">
                    <span class="material-icons text-[#C5A059] text-sm">workspace_premium</span>
                  </div>
                  <p class="text-sm">Priority Support</p>
                </div>
              </div>
            </div>

            <div class="bg-[#C5A059]/5 rounded-[2rem] p-8 border border-[#C5A059]/20">
              <h3 class="text-xl font-serif text-[#3D2B1F] mb-4">Need Help?</h3>
              <p class="text-sm text-gray-600 mb-6 leading-relaxed">Our luxury concierge is available 24/7 to assist with your orders.</p>
              <button class="w-full py-3 rounded-xl bg-[#C5A059] text-white font-medium hover:bg-[#A6864A] transition-all duration-300">
                Contact Concierge
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
export class UserProfile {
  auth = inject(AdminAuthService);
  router = inject(Router);

  logout() {
    this.auth.logout();
    this.router.navigate(['/']);
  }
}
