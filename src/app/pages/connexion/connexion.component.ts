import { Component, inject } from '@angular/core';
import { UserStore } from '../../store/users/users.state'
import { FormsModule } from '@angular/forms';
import {UserService} from '../../user.service'
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-connexion',
  imports: [FormsModule, CommonModule],
  templateUrl: './connexion.component.html',
  styleUrl: './connexion.component.scss',
})

export class ConnexionComponent {
  errorMessage: string ='';
  errorPresence: boolean = false;
  email: string = '';
  password: string ='';
  userStore = inject(UserStore);
  constructor(private userService: UserService, private router: Router) {}

  onSubmit() {
    this.userService.signin({ email : this.email, password: this.password}).subscribe({
      next: (res) => {
        console.log(res.message); // "Utilisateur connecté avec succès"
        localStorage.setItem('token', res.access_token); 
        localStorage.setItem('username', res.username); 
        this.userStore.login({
          token: res.access_token,
          username: res.username
        });
        this.router.navigate(['/']); //redirection vers la page home
      },
      error: (err) => {
        console.error('Échec de la connexion', err.error.detail);
        this.errorMessage = 'Email ou mot de passe incorrect.';
        this.errorPresence= true
      }
    });
  }

  onRedirect() {
    this.router.navigate(['/createUser']);
  }
}
