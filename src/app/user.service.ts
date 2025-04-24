import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

interface User {
    id: number;
    username: string;
    email: string;
    password: string
  }

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);
  readonly url = 'http://localhost:8000/';

    // POST - Connexion utilisateur
  signin(user: { email: string; password: string }): Observable<{ message: string; access_token: string; token_type: string, username: string }> {
    return this.http.post<{ message: string; access_token: string; token_type: string, username: string }>(`${this.url}signin/`, user);
  }

  // POST - Créer un nouvel utilisateur
  signup(user: Omit<User, 'id'>): Observable<{ message: string; access_token: string; token_type: string, username: string }> {
    return this.http.post<{ message: string; access_token: string; token_type: string, username: string }>(`${this.url}signup`, user);
  }
}