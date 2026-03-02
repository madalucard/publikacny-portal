import { Component, computed, inject, input, OnInit, output, signal } from '@angular/core';
import { Post, PostWithAuthor } from '../../core/models/post.model';
import { PostsService } from '../../core/services/posts.service';
import { UsersService } from '../../core/services/users.service';
import { forkJoin, map, of, switchMap } from 'rxjs';
import { User } from '../../core/models/user.model';
import { AuthorFilter } from './author-filter/author-filter';
import { LoadingSpinner } from '../../shared/components/loading-spinner/loading-spinner';
import { PostCard } from './post-card/post-card';
import { InfiniteScrollTrigger } from '../../shared/components/infinite-scroll-trigger/infinite-scroll-trigger';

@Component({
  selector: 'app-post-list',
  imports: [AuthorFilter, LoadingSpinner, PostCard, InfiniteScrollTrigger],
  templateUrl: './post-list.html',
  styleUrl: './post-list.scss',
})
export class PostList implements OnInit {
  readonly selectedPost = input<PostWithAuthor | null>(null);
  readonly postSelected = output<PostWithAuthor>();

  private readonly postsService = inject(PostsService);
  private readonly usersService = inject(UsersService);

  readonly posts = signal<PostWithAuthor[]>([]);
  readonly loading = signal(false);
  readonly loadingMore = signal(false);
  readonly selectedUserId = signal<number | null>(null);

  private currentPage = 1;
  private totalPages = 1;
  private userChache = new Map<number, string>();

  readonly hasMore = computed(() => this.currentPage < this.totalPages);

  ngOnInit(): void {
    this.loadPosts(true);
  }

  private loadPosts(initial: boolean): void {
    initial ? this.loading.set(true) : this.loadingMore.set(true);

    this.postsService
      .getPosts(this.currentPage, this.selectedUserId() ?? undefined)
      .pipe(
        switchMap(({ posts, meta }) => {
          this.totalPages = meta.pages;
          const uniqUserIds = [
            ...new Set(posts.map((p) => p.user_id).filter((id) => !this.userChache.has(id))),
          ];

          if (uniqUserIds.length === 0) {
            return of(posts);
          }

          return forkJoin(uniqUserIds.map((id) => this.usersService.getUsersById(id))).pipe(
            map((users: User[]) => {
              users.forEach((u) => this.userChache.set(u.id, u.name));
              return posts;
            }),
          );
        }),
        map((posts: Post[]) =>
          posts.map((p) => ({
            ...p,
            authorName: this.userChache.get(p.user_id) ?? 'Neznamy autor',
          })),
        ),
      )
      .subscribe({
        next: (enrihedPosts) => {
          this.posts.update((prev) => [...prev, ...enrihedPosts]);
          this.loading.set(false);
          this.loadingMore.set(false);
        },
        error: () => {
          this.loading.set(false);
          this.loadingMore.set(false);
        },
      });
  }

  reset() {
    this.posts.set([]);
    this.currentPage = 1;
    this.totalPages = 1;
  }

  onUserSelected(userId: number | null) {
    this.selectedUserId.set(userId);
    this.reset();
    this.loadPosts(true);
  }

  onPostSelected(post: PostWithAuthor): void {
    this.postSelected.emit(post);
  }

  onScrollTriggered() {
    if (!this.loading() && !this.loadingMore() && this.hasMore()) {
      this.currentPage;
      this.loadPosts(false);
    }
  }
}
