import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../services/toast';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-toast-container',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="fixed top-24 right-4 z-[9999] flex flex-col gap-3 pointer-events-none">
      <div *ngFor="let toast of toastService.toasts()" 
           class="bg-white border-2 border-[#EAF6FB] shadow-xl rounded-2xl p-4 flex items-center gap-4 animate-slide-in pointer-events-auto max-w-[320px] overflow-hidden">
        
        <!-- Cute Icon/Image -->
        <div class="relative shrink-0">
          <div class="w-14 h-14 bg-[#F9EDE0] rounded-full flex items-center justify-center overflow-hidden border-2 border-[#EAF6FB]">
            <img *ngIf="toast.productImage" [src]="api.getImageUrl(toast.productImage)" class="w-10 h-10 object-contain">
            <span *ngIf="!toast.productImage" class="text-2xl">🍼</span>
          </div>
          <!-- Little Heart Animation -->
          <div class="absolute -top-1 -right-1 animate-ping">❤️</div>
        </div>

        <div class="flex-1">
          <p class="text-[10px] font-bold text-[#0F83B2] uppercase tracking-wider mb-0.5">Yippee!</p>
          <p class="text-sm font-bold text-gray-800 leading-tight">{{ toast.message }}</p>
          <p class="text-[10px] text-gray-500 mt-1">Added to your cradle ✨</p>
        </div>

        <!-- Progress bar -->
        <div class="absolute bottom-0 left-0 h-1 bg-[#0F83B2] animate-progress"></div>
      </div>
    </div>
  `,
  styles: [`
    @keyframes slideIn {
      from { transform: translateX(120%) scale(0.9); opacity: 0; }
      to { transform: translateX(0) scale(1); opacity: 1; }
    }
    @keyframes progress {
      from { width: 100%; }
      to { width: 0%; }
    }
    .animate-slide-in {
      animation: slideIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
    }
    .animate-progress {
      animation: progress 3s linear forwards;
    }
    .shimmer-text {
      background: linear-gradient(90deg, #0F83B2, #4CC9F0, #0F83B2);
      background-size: 200% auto;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      animation: shine 2s linear infinite;
    }
    @keyframes shine {
      to { background-position: 200% center; }
    }
  `]
})
export class ToastContainer {
  toastService = inject(ToastService);
  api = inject(ApiService);
}
