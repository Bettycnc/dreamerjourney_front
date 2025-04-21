import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { login, logout } from '../../store/auth.actions';
import { AuthState } from '../../store/auth.reducer';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})

export class HeaderComponent {
  isAuthenticated$: Observable<boolean>;

  constructor(private router: Router, private store: Store<{ auth: AuthState }>) {
    this.isAuthenticated$ = this.store.select(state => state.auth.isAuthenticated);
  }

  redirectToPage() {
    this.store.dispatch(login()); // met à jour l'état dans le store
    this.router.navigate(['/login']);
  }

  redirectToHomePage() {
    this.store.dispatch(logout());
    this.router.navigate(['/']);
  }
}
