import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthState } from './store/auth.reducer';
import { SharedModule } from './shared/shared.module';

@Component({
  selector: 'app-root',
  standalone: true, 
  imports: [RouterOutlet, SharedModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent {
  title = 'frontend1';

  isAuthenticated$: Observable<boolean>;

  constructor(private store: Store<{ auth: AuthState }>) {
    // Sélectionner l'état depuis le store
    this.isAuthenticated$ = store.select(state => state.auth.isAuthenticated);
  }
}
