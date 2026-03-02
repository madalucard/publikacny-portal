import { PaginationMeta } from './api-response.model';

export interface Post {
  id: number;
  user_id: number;
  title: string;
  body: string;
}

export interface PostWithAuthor extends Post {
  authorName: string;
}

export interface PostsPage {
  posts: Post[];
  meta: PaginationMeta;
}
