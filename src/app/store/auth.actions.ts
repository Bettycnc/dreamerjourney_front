// src/app/store/auth.actions.ts
import { createAction } from '@ngrx/store';

// Actions pour login et logout
export const login = createAction('[Auth] Login');
export const logout = createAction('[Auth] Logout');
