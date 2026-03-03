import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { delay, map, Observable, of } from 'rxjs';

import { environment } from '../../../environment/environment';
import { Post, PostsPage } from '../models/post.model';
import { MOCK_POSTS } from '../mock/mock-data';

@Injectable({ providedIn: 'root' })
export class PostsService {
  private readonly httpClient = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/posts`;

  getPosts(page: number, userId?: number, useMock = false): Observable<PostsPage> {
    if (useMock) {
      const filtered = userId ? MOCK_POSTS.filter((p) => p.user_id === userId) : MOCK_POSTS;
      return of({ posts: filtered, meta: { pages: 1 } }).pipe(delay(400));
    }

    let params = new HttpParams().set('page', page).set('per_page', environment.pageSize);
    if (userId) params = params.set('user_id', userId);

    return this.httpClient.get<Post[]>(this.baseUrl, { params, observe: 'response' }).pipe(
      map((response) => ({
        posts: response.body ?? [],
        meta: {
          pages: parseInt(response.headers.get('x-pagination-pages') ?? '1', 10),
        },
      })),
    );
  }

  getPostById(id: number): Observable<Post> {
    return this.httpClient.get<Post>(`${this.baseUrl}/${id}`);
  }
}
