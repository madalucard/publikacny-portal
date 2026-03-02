import { Component, input } from '@angular/core';
import { Comment } from '../../../core/models/comment.model';

@Component({
  selector: 'app-comment-item',
  imports: [],
  templateUrl: './comment-item.html',
  styleUrl: './comment-item.scss',
})
export class CommentItem {
  [x: string]: any;
  readonly comment = input.required<Comment>();

  getColor(email: string): string {
    const colors = [
      '#6366f1',
      '#8b5cf6',
      '#ec4899',
      '#14b8a6',
      '#f59e0b',
      '#10b981',
      '#3b82f6',
      '#ef4444',
    ];
    let hash = 0;
    for (const c of email) hash = c.charCodeAt(0) + ((hash << 5) - hash);
    return colors[Math.abs(hash) % colors.length];
  }
}
