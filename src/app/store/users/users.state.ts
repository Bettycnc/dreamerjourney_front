import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import {User} from './user.model'

interface UserState {
  user: User[] | null;
  error: string | null;
}

const initialState: UserState = {
  user: null,
  error: null
};

export const UserStore = signalStore(
    { providedIn: 'root' },
    withState(initialState),

    withMethods((store) => ({
      login(user : User){
        patchState(store, (state) => ({
          user: [user]
        }));
      },

      logout(user : User){
        patchState(store, (state)  => ({
          user: null
        }))
      }

    })
    
))