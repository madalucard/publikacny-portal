import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../environment/environment';
import { User } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class UsersService {
  private readonly httpClient = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/users`;

  /**
   * Get users
   * @param page Page parameter
   * @param perPage PerPage parameter
   * @returns Users
   */
  getUsers(page: number = 1, perPage: number = 50): Observable<User[]> {
    const params = new HttpParams()
      .set('page', page)
      .set('perPage', perPage)
      .set('status', 'active');

    return this.httpClient.get<User[]>(this.baseUrl, { params: params });
  }

  /**
   * Get user by Id
   * @param id Requested user Id
   * @returns User
   */
  getUsersById(id: number): Observable<User> {
    return this.httpClient.get<User>(`${this.baseUrl}/${id}`);
  }
}
