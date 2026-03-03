import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';

import { environment } from '../../../environment/environment';
import { Comment } from '../models/comment.model';
import { MOCK_COMMENTS } from '../mock/mock-data';

@Injectable({ providedIn: 'root' })
export class CommentsService {
  private readonly http = inject(HttpClient);

  getCommentsByPost(postId: number, useMock = false): Observable<Comment[]> {
    if (useMock) {
      return of(MOCK_COMMENTS.filter((c) => c.post_id === postId)).pipe(delay(300));
    }
    return this.http.get<Comment[]>(`${environment.apiUrl}/posts/${postId}/comments`);
  }
}
