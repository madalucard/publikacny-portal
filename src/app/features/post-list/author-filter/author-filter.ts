import { Component, effect, inject, input, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { User } from '../../../core/models/user.model';
import { UsersService } from '../../../core/services/users.service';

@Component({
  selector: 'app-author-filter',
  imports: [FormsModule],
  templateUrl: './author-filter.html',
  styleUrl: './author-filter.scss',
})
export class AuthorFilter {
  readonly selectedUserId = input<number | null>(null);
  readonly useMock = input<boolean>(true);
  readonly userSelected = output<number | null>();

  readonly users = signal<User[]>([]);
  readonly loading = signal(false);

  private readonly usersService = inject(UsersService);

  constructor() {
    effect(() => {
      const mock = this.useMock();
      this.users.set([]);
      this.loading.set(true);
      this.usersService.getUsers(mock).subscribe({
        next: (users) => {
          this.users.set(users);
          this.loading.set(false);
        },
        error: () => {
          this.users.set([]);
          this.loading.set(false);
        },
      });
    });
  }

  onFilterChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this.userSelected.emit(value ? Number(value) : null);
  }
}
