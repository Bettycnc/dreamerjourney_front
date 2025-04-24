import { Component, inject } from '@angular/core';
import { UserStore } from '../../store/users/users.state'
import { FormsModule } from '@angular/forms';
import {UserService} from '../../user.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-inscription',
  imports: [FormsModule],
  templateUrl: './inscription.component.html',
  styleUrl: './inscription.component.scss',
})

export class InscriptionComponent {
  errorMessage= '';
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
        } 
        if (err.error.detail === 'Email déjà utilisé') {
          this.errorMessage = 'Email déjà utilisé';
        }
      }
    });
  }

  onRedirect() {
    this.router.navigate(['/login']);
  }
}
