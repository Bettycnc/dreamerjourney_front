import { Routes } from '@angular/router';
import {ConnexionComponent} from './pages/connexion/connexion.component' 
import {HomeComponent} from './pages/home/home.component'

export const routes: Routes = [
    { path: '', component: HomeComponent}, 
    { path: 'login', component: ConnexionComponent }, 
];