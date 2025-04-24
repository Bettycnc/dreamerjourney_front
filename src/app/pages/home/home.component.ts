import { Component, inject } from '@angular/core';
import {HeaderComponent} from '../../shared/header/header.component'
import { UserStore } from '../../store/users/users.state';
import { ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [HeaderComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})

export class HomeComponent {
  userStore = inject(UserStore)

  constructor(
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token) {
      const username = localStorage.getItem('username');
      
      // Charger l'état dans le store
      this.userStore.login({
        token: token,
        username: username || '',  
      });
      this.cdr.detectChanges();
    }
  }
  userSignal = this.userStore.user

}
