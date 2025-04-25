import { Component, inject } from '@angular/core';
import { UserStore } from '../../store/users/users.state'
import { FormsModule } from '@angular/forms';
import {UserService} from '../../user.service'
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-inscription',
  imports: [FormsModule, CommonModule],
  templateUrl: './inscription.component.html',
  styleUrl: './inscription.component.scss',
})

export class InscriptionComponent {
  errorMessage: string ='';
  errorUsername: boolean = false
  errorEmail: boolean = false
  email: string = '';
  password: string ='';
  username: string ='';
  userStore = inject(UserStore);
  constructor(private userService: UserService, private router: Router) {}

  onSubmit() {
    this.userService.signup({ email : this.email, password: this.password, username: this.username}).subscribe({
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
        if (err.error.detail === 'Username déjà utilisé') {
          this.errorMessage = 'Username déjà utilisé';
          this.errorUsername = true
        } 
        if (err.error.detail === 'Email déjà utilisé') {
          this.errorMessage = 'Email déjà utilisé';
          this.errorEmail = true
        }
      }
    });
  }

  resetEmailError() {
    this.errorEmail= false
  }

  resetUsernameError() {
    this.errorUsername= false
  }

  onRedirect() {
    this.router.navigate(['/login']);
  }
}
