import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SITE_CONTENT } from '../../data/site-content';

@Component({
  selector: 'app-blog',
  imports: [CommonModule, RouterModule],
  templateUrl: './blog.html',
  styleUrl: './blog.css',
})
export class Blog {
  posts = SITE_CONTENT.blogPosts;
}
