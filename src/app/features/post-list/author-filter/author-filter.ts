import { Component, inject, input, OnInit, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { User } from '../../../core/models/user.model';
import { UsersService } from '../../../core/services/users.service';

@Component({
  selector: 'app-author-filter',
  imports: [FormsModule],
  templateUrl: './author-filter.html',
  styleUrl: './author-filter.scss',
})
export class AuthorFilter implements OnInit {
  readonly selectedUserId = input<number | null>(null);
  readonly userSelected = output<number | null>();

  readonly users = signal<User[]>([]);
  readonly loading = signal(false);

  private readonly usersService = inject(UsersService);

  ngOnInit(): void {
    this.loading.set(true);
    this.usersService.getUsers().subscribe({
      next: (users) => {
        this.users.set(users);
        this.loading.set(false);
      },
      error: () => this.loading.set(false),
    });
  }

  onFilterChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.userSelected.emit(value ? Number(value) : null);
  }
}
