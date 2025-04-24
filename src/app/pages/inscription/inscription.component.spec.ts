import { TestBed } from '@angular/core/testing';
import { InscriptionComponent } from './inscription.component';
import { UserService } from '../../user.service';
import { Router } from '@angular/router';
import { of } from 'rxjs/internal/observable/of';
import { throwError } from 'rxjs';

describe('InscriptionComponent', () => {
  let component: InscriptionComponent;
  let userServiceSpy: jasmine.SpyObj<UserService>; // pour simuler l’appel API signin()
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    userServiceSpy = jasmine.createSpyObj('UserService', ['signup']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [InscriptionComponent],
      providers: [
        { provide: UserService, useValue: userServiceSpy },
        { provide: Router, useValue: routerSpy },
      ]
    }).compileComponents();
    
  });

  beforeEach(() => {
    const fixture = TestBed.createComponent(InscriptionComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should redirect to home', () => {
    const information = {
      message: 'Utilisateur connecté avec succès',
      access_token: 'fake-token',
      username: 'testusername',
      token_type:'bearer'
    };

    userServiceSpy.signup.and.returnValue(of(information));
    component.email = 'test@test.com';
    component.password = 'password';
    component.username= 'testusername'

    component.onSubmit();
    
    expect(userServiceSpy.signup).toHaveBeenCalledWith({
      email: 'test@test.com',
      password: 'password',
      username: 'testusername'
    });

    expect(localStorage.getItem('token')).toEqual('fake-token');
    expect(localStorage.getItem('username')).toEqual('testusername');
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/']);
  });


  it('should log an error when email already exist', () => {
    const errorResponse = {error: { detail: 'Email déjà utilisé' } };  

    // Simuler que le service retourne une erreur avec throwError
    userServiceSpy.signup.and.returnValue(throwError(() => errorResponse));
  
    // Configurer les champs du formulaire avec des valeurs erronées
    component.email = 'test@test.com';
    component.password = 'password'; 
    component.username = 'usertest'
  
    // Soumettre le formulaire
    component.onSubmit();
  
    expect(userServiceSpy.signup).toHaveBeenCalledWith({
      email: 'test@test.com',
      username: 'usertest',
      password: 'password'
    });
    
    // Vérifier que le message d'erreur a bien été assigné
    expect(component.errorMessage).toBe('Email déjà utilisé');
  });
});
