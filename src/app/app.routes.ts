import { Routes } from '@angular/router';
import {ConnexionComponent} from './pages/connexion/connexion.component' 
import {HomeComponent} from './pages/home/home.component'
import { InscriptionComponent } from './pages/inscription/inscription.component';

export const routes: Routes = [
    { path: '', component: HomeComponent}, 
    { path: 'login', component: ConnexionComponent }, 
    { path: 'createUser', component: InscriptionComponent }, 
];