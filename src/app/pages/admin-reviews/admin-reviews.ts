import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-admin-reviews',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="space-y-6">
      <div class="flex items-center justify-between">
        <h2 class="text-2xl font-bold text-gray-800">Product Reviews</h2>
        <span class="px-3 py-1 bg-purple-100 text-purple-600 text-xs font-bold rounded-full">
          {{ reviews.length }} Submissions
        </span>
      </div>

      <div class="grid grid-cols-1 gap-4">
        <div *ngIf="reviews.length === 0" class="bg-white p-12 text-center rounded-2xl border border-gray-100">
           <p class="text-gray-400">No reviews submitted yet.</p>
        </div>

        <div *ngFor="let rev of reviews" 
             class="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          
          <div class="flex-1">
            <div class="flex items-center gap-2 mb-1">
              <span class="font-bold text-gray-800">{{ rev.userName }}</span>
              <span class="text-yellow-400 text-xs">
                {{ '★'.repeat(rev.rating) }}{{ '☆'.repeat(5 - rev.rating) }}
              </span>
            </div>
            <p class="text-xs text-[#0F83B2] font-bold uppercase mb-2">
              Product: {{ rev.productId?.name || 'Unknown' }}
            </p>
            <p class="text-sm text-gray-600 italic">"{{ rev.comment }}"</p>
            <p class="text-[10px] text-gray-400 mt-2">{{ rev.createdAt | date:'mediumDate' }}</p>
          </div>

          <div class="flex items-center gap-3">
            <button (click)="toggleApproval(rev._id)" 
                    [class]="rev.isApproved ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-400'"
                    class="px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition">
              {{ rev.isApproved ? 'Approved' : 'Approve' }}
            </button>
            <button (click)="deleteReview(rev._id)" class="p-2 text-red-400 hover:bg-red-50 rounded-full transition">
              <span class="material-icons text-sm">delete</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  `
})
export class AdminReviews implements OnInit {
  reviews: any[] = [];

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.loadReviews();
  }

  loadReviews() {
    this.api.getReviews().subscribe(data => this.reviews = data);
  }

  toggleApproval(id: string) {
    this.api.toggleReviewApproval(id).subscribe(() => this.loadReviews());
  }

  deleteReview(id: string) {
    if(confirm('Delete this review?')) {
      this.api.deleteReview(id).subscribe(() => this.loadReviews());
    }
  }
}
