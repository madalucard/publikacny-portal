import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { environment } from '../../../environment/environment';
import { Post, PostsPage } from '../models/post.model';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private readonly httpClient = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/posts`;

  /**
   * Get Posts
   * @param page
   * @param userId Post bz user
   * @returns Posts
   */
  getPosts(page: number, userId?: number): Observable<PostsPage> {
    let params = new HttpParams().set('page', page).set('perPage', environment.pageSize);
    if (userId) {
      params = params.set('user_id', userId);
    }

    return this.httpClient.get<Post[]>(this.baseUrl, { params, observe: 'response' }).pipe(
      map((response) => ({
        posts: response.body ?? [],
        meta: {
          total: parseInt(response.headers.get('x-pagination-total') ?? '0', 10),
          pages: parseInt(response.headers.get('x-pagination-pages') ?? '1', 10),
          page: parseInt(response.headers.get('x-pagination-page') ?? '1', 10),
          limit: parseInt(response.headers.get('x-pagination-limit') ?? '10', 10),
        },
      })),
    );
  }

  /**
   * Get post by Id
   * @param id Requested post Id
   * @returns Post
   */
  getPostById(id: number): Observable<Post> {
    return this.httpClient.get<Post>(`${this.baseUrl}/${id}`);
  }
}
