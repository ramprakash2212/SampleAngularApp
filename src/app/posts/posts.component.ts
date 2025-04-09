import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DashboardComponent } from '../dashboard/dashboard.component';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-posts',
  imports: [CommonModule, FormsModule, DashboardComponent],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.css',
})
export class PostsComponent implements OnInit {
  posts: any[] = [];
  newPost: any = { title: '', body: '' };
  updateData = { id: null, title: '', body: '' };
  totalPosts = 0;
  updatedPostsCount = 0;
  newPostsCount = 0;
  deletedPostsCount = 0;
  deletePostId: number | null = null;
  showCreatePostForm = false;

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.fetchPosts();
  }

  fetchPosts() {
    this.postService.getPosts().subscribe({
      next: (data) => {
        this.posts = data.slice(0, 10);
        this.totalPosts = data.length;
      },
      error: (error) => console.error('Error fetching posts', error),
    });
  }

  createPost() {
    if (this.newPost.title.trim() && this.newPost.body.trim()) {
      this.postService.createPost(this.newPost).subscribe({
        next: (post) => {
          this.posts.push(post);
          this.newPostsCount++;
          this.totalPosts++;   
          this.showCreatePostForm = false;             
        },
        error: (error) => console.error('Error creating post', error),
      });
    }
  }
 

  updatePost() {
    const { id, title, body } = this.updateData;
    if (id !== null) {
      this.postService.updatePost(id, { title, body }).subscribe({
        next: (updatedPost) => {
          const postIndex = this.posts.findIndex((post) => post.id === updatedPost.id);
          if (postIndex !== -1) {
            this.posts[postIndex] = updatedPost;
            this.updatedPostsCount++;
          }
          this.closeModal('editModal');
        },
        error: (error) => console.error('Error updating post', error),
      });
    }
  }

  deletePostConfirmed() {
    if (this.deletePostId !== null) {
      this.postService.deletePost(this.deletePostId).subscribe({
        next: () => {
          this.posts = this.posts.filter((post) => post.id !== this.deletePostId);
          this.deletedPostsCount++;
          this.totalPosts--;
          this.deletePostId = null;
          this.closeModal('deleteModal');
        },
        error: (error) => console.error('Error deleting post', error),
      });
    }
  }

  openEditModal(post: any) {
    this.updateData = { ...post };
    this.openModal('editModal');
  }

  confirmDelete(post: any) {
    this.deletePostId = post.id;
    this.openModal('deleteModal');
  }

  private openModal(modalId: string) {
    const modal = document.getElementById(modalId);
    if (modal) {
      const modalInstance = new bootstrap.Modal(modal);
      modalInstance.show();
    }
  }

  private closeModal(modalId: string) {
    const modal = document.getElementById(modalId);
    if (modal) {
      const modalInstance = bootstrap.Modal.getInstance(modal);
      modalInstance?.hide();
    }
  }
}
