import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UserStore } from '../../store/users/users.state'

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  providers:[UserStore]
})

export class HeaderComponent {
  user = inject(UserStore)
  userSignal = this.user.user

  constructor(private router: Router) {
  }

  redirectToPage() {
    this.router.navigate(['/login']);
  }

  redirectToHomePage() {
    this.router.navigate(['/']);
  }
}
