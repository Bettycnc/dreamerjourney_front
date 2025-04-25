import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UserStore } from '../../store/users/users.state'

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  template: `
      <header>
        <img class="logo" src='/Logo.png' alt='DreamerJourney'/>
        <nav>
          <button class="button" (click)="redirectToPageLogin()" *ngIf="!userSignal()">Connexion</button>
          <button class="button" (click)="redirectToPageCreateUser()" *ngIf="!userSignal()">Inscription</button>
          <div class='deconnecter'>
            <p *ngIf="userSignal()">Bonjour {{ userSignal()?.username}}</p>
            <button class="button" (click)="redirectToHomePage()" *ngIf="userSignal()">Déconnexion</button>
          </div>
        </nav>
      </header>
  `,
  styleUrl: './header.component.scss',
})

export class HeaderComponent {

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token) {
      const username = localStorage.getItem('username');
      
      // Charger l'état dans le store
      this.userStore.login({
        token: token,
        username: username || '',  
      });
    }
  }

  userStore = inject(UserStore)
  userSignal = this.userStore.user

  constructor(private router: Router) {
  }

  redirectToPageLogin() {
    this.router.navigate(['/login']);
  }

  redirectToPageCreateUser() {
    this.router.navigate(['/createUser']);
  }

  redirectToHomePage() {
    this.userStore.logout()
    this.router.navigate(['/']);
  }
}
