import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-admin-messages',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="space-y-6">
      <div class="flex items-center justify-between">
        <h2 class="text-2xl font-bold text-gray-800">Customer Messages</h2>
        <span class="px-3 py-1 bg-blue-100 text-[#0F83B2] text-xs font-bold rounded-full">
          {{ messages.length }} Total
        </span>
      </div>

      <div class="grid grid-cols-1 gap-4">
        <div *ngIf="messages.length === 0" class="bg-white p-12 text-center rounded-2xl border border-gray-100">
           <p class="text-gray-400">No messages received yet.</p>
        </div>

        <div *ngFor="let msg of messages" 
             class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition group relative">
          <div class="flex justify-between items-start mb-4">
            <div>
              <h3 class="font-bold text-gray-800 text-lg">{{ msg.name }}</h3>
              <p class="text-xs text-gray-400 font-medium">{{ msg.email }} • {{ msg.createdAt | date:'medium' }}</p>
            </div>
            <div class="flex items-center gap-2">
               <span [class]="getStatusClass(msg.status)" class="px-2 py-0.5 text-[10px] font-bold uppercase rounded-full">
                 {{ msg.status }}
               </span>
               <button (click)="deleteMessage(msg._id)" class="opacity-0 group-hover:opacity-100 p-1 text-red-400 hover:text-red-600 transition">
                 <span class="material-icons text-sm">delete</span>
               </button>
            </div>
          </div>
          
          <div class="bg-gray-50 p-4 rounded-xl text-sm text-gray-600 leading-relaxed italic">
            "{{ msg.message }}"
          </div>

          <div class="mt-4 flex gap-2">
            <button *ngIf="msg.status === 'New'" (click)="updateStatus(msg._id, 'Read')" 
                    class="text-[10px] font-bold text-[#0F83B2] uppercase tracking-wider hover:underline">
              Mark as Read
            </button>
            <a [href]="'mailto:' + msg.email" (click)="updateStatus(msg._id, 'Replied')"
               class="text-[10px] font-bold text-green-600 uppercase tracking-wider hover:underline">
              Reply via Email
            </a>
          </div>
        </div>
      </div>
    </div>
  `
})
export class AdminMessages implements OnInit {
  messages: any[] = [];

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.loadMessages();
  }

  loadMessages() {
    this.api.getMessages().subscribe(data => this.messages = data);
  }

  updateStatus(id: string, status: string) {
    this.api.updateMessageStatus(id, status).subscribe(() => this.loadMessages());
  }

  deleteMessage(id: string) {
    if(confirm('Delete this message?')) {
      this.api.deleteMessage(id).subscribe(() => this.loadMessages());
    }
  }

  getStatusClass(status: string) {
    switch(status) {
      case 'New': return 'bg-yellow-100 text-yellow-700';
      case 'Read': return 'bg-blue-100 text-blue-700';
      case 'Replied': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  }
}
