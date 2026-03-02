import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { PostList } from './features/post-list/post-list';
import { PostWithAuthor } from './core/models/post.model';
import { PostDetail } from './features/post-detail/post-detail';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, PostList, PostDetail],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  // mockPosts: PostWithAuthor[] = [
  //   {
  //     id: 1,
  //     user_id: 42,
  //     title: 'Trololo title',
  //     body: 'Trololo body',
  //     authorName: 'Alice',
  //   },
  // ];

  // mockComments = [
  //   { id: 1, post_id: 5, name: 'Jan', email: 'jan@test.com', body: 'Skvelý článok!' },
  // ];
  protected readonly title = signal('publikacny-portal');

  readonly selectedPost = signal<PostWithAuthor | null>(null);
  onPostSelected(post: PostWithAuthor) {
    this.selectedPost.set(post);
  }

  // private destroyRef = inject(DestroyRef);
  // private usersService = inject(UsersService);
  // private postsService = inject(PostsService);
  // private commentsService = inject(CommentsService);

  ngOnInit(): void {
    // Test console logs
    // this.usersService.getUsers().subscribe((users) => console.log('USERS', users));
    // this.usersService.getUsersById(8390289).subscribe((user) => console.log('USER', user));
    // this.postsService.getPosts(1).subscribe((posts) => console.log('POSTS', posts));
    // this.postsService.getPostById(272782).subscribe((post) => console.log('POST', post));
    // this.commentsService
    //   .getCommentsByPost(272782)
    //   .subscribe((comment) => console.log('COMMENT', comment));
  }
}
