import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environment/environment';
import { Comment } from '../models/comment.model';

@Injectable({ providedIn: 'root' })
export class CommentsService {
  private readonly http = inject(HttpClient);

  /**
   * Get comments by post
   * @param postId Post id
   * @returns Comments under post
   */
  getCommentsByPost(postId: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${environment.apiUrl}/posts/${postId}/comments`);
  }
}
