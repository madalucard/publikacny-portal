import { Component, computed, effect, inject, input, output, signal } from '@angular/core';
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
export class PostList {
  readonly selectedPost = input<PostWithAuthor | null>(null);
  readonly useMock = input<boolean>(true);
  readonly postSelected = output<PostWithAuthor>();

  private readonly postsService = inject(PostsService);
  private readonly usersService = inject(UsersService);

  readonly posts = signal<PostWithAuthor[]>([]);
  readonly loading = signal(false);
  readonly loadingMore = signal(false);
  readonly selectedUserId = signal<number | null>(null);

  private currentPage = 1;
  private totalPages = 1;
  private userCache = new Map<number, string>();

  readonly hasMore = computed(() => this.currentPage < this.totalPages);

  private initialized = false;

  constructor() {
    effect(() => {
      const mock = this.useMock();
      if (!this.initialized) {
        this.initialized = true;
        this.loadPosts(true, mock);
        return;
      }
      this.posts.set([]);
      this.currentPage = 1;
      this.totalPages = 1;
      this.userCache.clear();
      this.selectedUserId.set(null);
      this.loadPosts(true, mock);
    });
  }

  private loadPosts(initial: boolean, useMock = this.useMock()): void {
    initial ? this.loading.set(true) : this.loadingMore.set(true);

    if (useMock) {
      this.postsService
        .getPosts(this.currentPage, this.selectedUserId() ?? undefined, true)
        .subscribe({
          next: ({ posts, meta }) => {
            this.totalPages = meta.pages;
            this.posts.update((prev) => [...prev, ...(posts as PostWithAuthor[])]);
            this.loading.set(false);
            this.loadingMore.set(false);
          },
          error: () => {
            this.loading.set(false);
            this.loadingMore.set(false);
          },
        });
      return;
    }

    this.postsService
      .getPosts(this.currentPage, this.selectedUserId() ?? undefined, false)
      .pipe(
        switchMap(({ posts, meta }) => {
          this.totalPages = meta.pages;
          const uniqUserIds = [
            ...new Set(posts.map((p) => p.user_id).filter((id) => !this.userCache.has(id))),
          ];

          if (uniqUserIds.length === 0) return of(posts);

          return forkJoin(uniqUserIds.map((id) => this.usersService.getUsersById(id))).pipe(
            map((users: User[]) => {
              users.forEach((u) => this.userCache.set(u.id, u.name));
              return posts;
            }),
          );
        }),
        map((posts: Post[]) =>
          posts.map((p) => ({
            ...p,
            authorName: this.userCache.get(p.user_id) ?? 'Neznámy autor',
          })),
        ),
      )
      .subscribe({
        next: (enrichedPosts) => {
          this.posts.update((prev) => [...prev, ...enrichedPosts]);
          this.loading.set(false);
          this.loadingMore.set(false);
        },
        error: () => {
          this.loading.set(false);
          this.loadingMore.set(false);
        },
      });
  }

  onUserSelected(userId: number | null): void {
    this.posts.set([]);
    this.currentPage = 1;
    this.totalPages = 1;
    this.userCache.clear();
    this.selectedUserId.set(userId);
    this.loadPosts(true);
  }

  onPostSelected(post: PostWithAuthor): void {
    this.postSelected.emit(post);
  }

  onScrollTriggered(): void {
    if (!this.loading() && !this.loadingMore() && this.hasMore()) {
      this.currentPage++;
      this.loadPosts(false);
    }
  }
}
