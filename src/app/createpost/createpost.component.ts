import { Component, EventEmitter, Output } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { PostService } from '../post.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-createpost',
  imports: [CommonModule, FormsModule],
  templateUrl: './createpost.component.html',
  styleUrl: './createpost.component.css',
})
export class CreatepostComponent {
  newPost: any = { title: '', body: '' };
  posts: any[] = [];
  totalPosts = 0;
  newPostsCount = 0;
  constructor(private postService: PostService, private router: Router) {}
  
  
  createPost() {
    if (this.newPost.title.trim() && this.newPost.body.trim()) {
      this.postService.createPost(this.newPost).subscribe({
        next: (post) => {
          this.posts.push(post);
          this.newPostsCount++;
          this.totalPosts++;
          this.router.navigate(['/posts']);          
        },
        error: (error) => console.error('Error creating post', error),
      });
    }
  }
}
