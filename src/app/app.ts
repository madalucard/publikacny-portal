import { Component, signal } from '@angular/core';

import { PostList } from './features/post-list/post-list';
import { PostWithAuthor } from './core/models/post.model';
import { PostDetail } from './features/post-detail/post-detail';

@Component({
  selector: 'app-root',
  imports: [PostList, PostDetail],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('publikacny-portal');
  readonly selectedPost = signal<PostWithAuthor | null>(null);

  onPostSelected(post: PostWithAuthor) {
    this.selectedPost.set(post);
  }
}
