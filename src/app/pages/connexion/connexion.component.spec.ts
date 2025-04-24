import { TestBed } from '@angular/core/testing';
import { ConnexionComponent } from './connexion.component';
import { Router } from '@angular/router';
import { UserService } from '../../user.service';
import { of, throwError } from 'rxjs';

describe('ConnexionComponent', () => {
  let component: ConnexionComponent;

  let userServiceSpy: jasmine.SpyObj<UserService>; // pour simuler l’appel API signin()
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    userServiceSpy = jasmine.createSpyObj('UserService', ['signin']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [ConnexionComponent],
      providers: [
        { provide: UserService, useValue: userServiceSpy },
        { provide: Router, useValue: routerSpy },
      ]
    }).compileComponents();
    
  });

  beforeEach(() => {
    const fixture = TestBed.createComponent(ConnexionComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should redirect to home', () => {
    const information = {
      message: 'Utilisateur connecté avec succès',
      access_token: 'fake-token',
      username: 'testuser',
      token_type:'bearer'
    };

    userServiceSpy.signin.and.returnValue(of(information));
    component.email = 'test@test.com';
    component.password = 'password';

    component.onSubmit();
    
    expect(userServiceSpy.signin).toHaveBeenCalledWith({
      email: 'test@test.com',
      password: 'password'
    });

    expect(localStorage.getItem('token')).toEqual('fake-token');
    expect(localStorage.getItem('username')).toEqual('testuser');
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should log an error when login fails due to incorrect password', () => {
    const errorResponse = { status: 401 };  // Simuler une erreur 401 (mauvais mot de passe)
    spyOn(console, 'log');  // Espionner console.log pour vérifier ce qui est loggé
  
    // Simuler que le service retourne une erreur avec throwError
    userServiceSpy.signin.and.returnValue(throwError(() => errorResponse));
  
    // Configurer les champs du formulaire avec des valeurs erronées
    component.email = 'test@test.com';
    component.password = 'wrongPassword';  // Mauvais mot de passe
  
    // Soumettre le formulaire
    component.onSubmit();
  
    // Vérifier que le service a bien été appelé avec le mauvais mot de passe
    expect(userServiceSpy.signin).toHaveBeenCalledWith({
      email: 'test@test.com',
      password: 'wrongPassword'
    });
    
    // Vérifier que le message d'erreur a bien été assigné
    expect(component.errorMessage).toBe('Email ou mot de passe incorrect.');
  });
  
});
