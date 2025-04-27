import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UserStore } from '../../store/users/users.state'

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  template: `
      <header>
        <div class="Logocontainer">
          <img class="logo" src='/Logo.svg' alt='Nomad'/>
        </div>
        <nav>
          <button class="button" >Accueil</button>
          <button class="button" (click)="redirectToPageLogin()" *ngIf="!userSignal()">Connexion</button>
          <button class="button" (click)="redirectToPageCreateUser()" *ngIf="!userSignal()">Inscription</button>
          <button class="button" (click)="deconnection()" *ngIf="userSignal()">Déconnexion</button>
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

  deconnection() {
    this.userStore.logout()
    this.router.navigate(['/']);
  }

  redirectToHomePage() {
    this.router.navigate(['/'])
  }
}
