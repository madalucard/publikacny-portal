import { Component, effect, inject, input, signal } from '@angular/core';

import { PostWithAuthor } from '../../core/models/post.model';
import { CommentsService } from '../../core/services/comments.service';
import { Comment } from '../../core/models/comment.model';
import { LoadingSpinner } from '../../shared/components/loading-spinner/loading-spinner';
import { CommentItem } from './comment-item/comment-item';

@Component({
  selector: 'app-post-detail',
  imports: [LoadingSpinner, CommentItem],
  templateUrl: './post-detail.html',
  styleUrl: './post-detail.scss',
})
export class PostDetail {
  readonly post = input<PostWithAuthor | null>(null);
  readonly useMock = input<boolean>(true);

  readonly comments = signal<Comment[]>([]);
  readonly loadingComments = signal(false);

  private readonly commentsService = inject(CommentsService);

  constructor() {
    effect(() => {
      const currentPost = this.post();
      const mock = this.useMock();
      if (currentPost) {
        this.loadComments(currentPost.id, mock);
      } else {
        this.comments.set([]);
      }
    });
  }

  loadComments(postId: number, useMock = false): void {
    this.loadingComments.set(true);
    this.commentsService.getCommentsByPost(postId, useMock).subscribe({
      next: (comments) => {
        this.comments.set(comments);
        this.loadingComments.set(false);
      },
      error: () => this.loadingComments.set(false),
    });
  }
}
