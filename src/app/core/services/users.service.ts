import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';

import { environment } from '../../../environment/environment';
import { User } from '../models/user.model';
import { MOCK_USERS } from '../mock/mock-data';

@Injectable({ providedIn: 'root' })
export class UsersService {
  private readonly httpClient = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/users`;

  getUsers(useMock = false): Observable<User[]> {
    if (useMock) {
      return of(MOCK_USERS).pipe(delay(300));
    }
    const params = new HttpParams().set('page', 1).set('per_page', 50).set('status', 'active');
    return this.httpClient.get<User[]>(this.baseUrl, { params });
  }

  getUsersById(id: number, useMock = false): Observable<User> {
    if (useMock) {
      return of(MOCK_USERS.find((u) => u.id === id)!).pipe(delay(100));
    }
    return this.httpClient.get<User>(`${this.baseUrl}/${id}`);
  }
}
