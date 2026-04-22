import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SITE_CONTENT } from '../../data/site-content';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-contact',
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact implements OnInit {
  isLoading = true;
  info = SITE_CONTENT.companyInfo;

  messageData = {
    name: '',
    email: '',
    message: ''
  };
  isSending = false;

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.isLoading = false;
  }

  sendMessage() {
    if (!this.messageData.name || !this.messageData.email || !this.messageData.message) {
      alert('Please fill in all fields.');
      return;
    }

    this.isSending = true;
    this.api.sendMessage(this.messageData).subscribe({
      next: () => {
        alert('Message sent successfully! We will get back to you soon.');
        this.messageData = { name: '', email: '', message: '' };
        this.isSending = false;
      },
      error: () => {
        alert('Failed to send message. Please try again.');
        this.isSending = false;
      }
    });
  }
}
