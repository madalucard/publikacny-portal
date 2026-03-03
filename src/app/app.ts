import { Component, signal } from '@angular/core';
import { PostWithAuthor } from './core/models/post.model';
import { PostList } from './features/post-list/post-list';
import { PostDetail } from './features/post-detail/post-detail';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [PostList, PostDetail],
  templateUrl: './app.html',
  styleUrls: ['./app.scss'],
})
export class App {
  readonly selectedPost = signal<PostWithAuthor | null>(null);
  readonly useMock = signal(true);

  onPostSelected(post: PostWithAuthor): void {
    this.selectedPost.set(post);
  }

  toggleMock(): void {
    this.useMock.update((v) => !v);
    this.selectedPost.set(null);
  }
}
