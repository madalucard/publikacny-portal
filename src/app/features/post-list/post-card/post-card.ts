import { Component, input, output } from '@angular/core';

import { PostWithAuthor } from '../../../core/models/post.model';
import { TruncatePipe } from '../../../shared/pipes/truncate-pipe';

@Component({
  selector: 'app-post-card',
  imports: [TruncatePipe],
  templateUrl: './post-card.html',
  styleUrl: './post-card.scss',
})
export class PostCard {
  readonly post = input.required<PostWithAuthor>();
  readonly selected = input(false);
  readonly postSelected = output<PostWithAuthor>();

  select(): void {
    this.postSelected.emit(this.post());
  }
}
