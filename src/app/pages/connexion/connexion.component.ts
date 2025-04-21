import { Component } from '@angular/core';
import { UserStore } from '../../store/users/users.state'
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-connexion',
  imports: [FormsModule],
  templateUrl: './connexion.component.html',
  styleUrl: './connexion.component.scss',
  providers:[UserStore]
})

export class ConnexionComponent {
  email: string = '';
  password: string ='';

  onSubmit() {
    console.log('Email:', this.email);
    console.log('Mot de passe:', this.password);
  }
}
