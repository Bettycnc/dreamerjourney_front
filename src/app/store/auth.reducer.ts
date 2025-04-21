// src/app/store/auth.reducer.ts
import { createReducer, on } from '@ngrx/store';
import { login, logout } from './auth.actions';

// Définir l'état initial
export interface AuthState {
  isAuthenticated: boolean;
}

export const initialState: AuthState = {
  isAuthenticated: false
};

// Définir le reducer
export const authReducer = createReducer(
  initialState,
  on(login, (state) => ({ ...state, isAuthenticated: true })),
  on(logout, (state) => ({ ...state, isAuthenticated: false }))
);
