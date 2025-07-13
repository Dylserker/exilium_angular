import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterLink],
  template: `
    <div class="register-container">
      <div class="register-card">
        <div class="register-header">
          <h1>Inscription</h1>
          <p>Créez votre compte gratuitement</p>
        </div>
        
        <form class="register-form" (ngSubmit)="onRegister()">
          <div class="form-row">
            <div class="form-group">
              <label for="firstName">Prénom</label>
              <input 
                type="text" 
                id="firstName" 
                name="firstName" 
                [(ngModel)]="firstName" 
                required 
                placeholder="Votre prénom"
              >
            </div>
            
            <div class="form-group">
              <label for="lastName">Nom</label>
              <input 
                type="text" 
                id="lastName" 
                name="lastName" 
                [(ngModel)]="lastName" 
                required 
                placeholder="Votre nom"
              >
            </div>
          </div>
          
          <div class="form-group">
            <label for="email">Email</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              [(ngModel)]="email" 
              required 
              placeholder="votre@email.com"
            >
          </div>
          
          <div class="form-group">
            <label for="password">Mot de passe</label>
            <input 
              type="password" 
              id="password" 
              name="password" 
              [(ngModel)]="password" 
              required 
              placeholder="Créez un mot de passe"
            >
          </div>
          
          <div class="form-group">
            <label for="confirmPassword">Confirmer le mot de passe</label>
            <input 
              type="password" 
              id="confirmPassword" 
              name="confirmPassword" 
              [(ngModel)]="confirmPassword" 
              required 
              placeholder="Confirmez votre mot de passe"
            >
          </div>
          
          <div class="form-options">
            <label class="checkbox-label">
              <input type="checkbox" [(ngModel)]="acceptTerms" required name="acceptTerms">
              <span>J'accepte les <a href="#" class="terms-link">conditions d'utilisation</a></span>
            </label>
          </div>
          
          <button type="submit" class="register-btn" [disabled]="isLoading">
            {{ isLoading ? 'Création du compte...' : 'Créer mon compte' }}
          </button>
        </form>
        
        <div class="register-footer">
          <p>Déjà un compte ? <a routerLink="/login">Se connecter</a></p>
          <a routerLink="/" class="back-home">← Retour à l'accueil</a>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .register-container {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, #1a1a1a 0%, #2d1b1b 100%);
      padding: 20px;
    }

    .register-card {
      background: rgba(255, 255, 255, 0.05);
      border-radius: 20px;
      padding: 40px;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
      width: 100%;
      max-width: 500px;
      border: 1px solid rgba(255, 68, 68, 0.2);
      backdrop-filter: blur(10px);
    }

    .register-header {
      text-align: center;
      margin-bottom: 30px;
    }

    .register-header h1 {
      color: #ff4444;
      font-size: 2rem;
      margin-bottom: 10px;
      font-weight: 700;
      text-shadow: 0 0 20px rgba(255, 68, 68, 0.5);
    }

    .register-header p {
      color: #cccccc;
      font-size: 1rem;
    }

    .register-form {
      margin-bottom: 20px;
    }

    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 15px;
      margin-bottom: 20px;
    }

    .form-group {
      margin-bottom: 20px;
    }

    .form-group label {
      display: block;
      margin-bottom: 8px;
      color: #cccccc;
      font-weight: 600;
      font-size: 0.9rem;
    }

    .form-group input {
      width: 100%;
      padding: 12px 16px;
      background: rgba(255, 255, 255, 0.1);
      border: 2px solid rgba(255, 68, 68, 0.3);
      border-radius: 10px;
      font-size: 1rem;
      transition: all 0.3s ease;
      box-sizing: border-box;
      color: white;
    }

    .form-group input:focus {
      outline: none;
      border-color: #ff4444;
      box-shadow: 0 0 15px rgba(255, 68, 68, 0.3);
    }

    .form-group input::placeholder {
      color: #999999;
    }

    .form-options {
      margin-bottom: 25px;
    }

    .checkbox-label {
      display: flex;
      align-items: flex-start;
      gap: 8px;
      color: #cccccc;
      font-size: 0.9rem;
      cursor: pointer;
      line-height: 1.4;
    }

    .checkbox-label input[type="checkbox"] {
      width: auto;
      margin: 0;
      margin-top: 2px;
    }

    .terms-link {
      color: #ff4444;
      text-decoration: none;
      transition: color 0.3s ease;
    }

    .terms-link:hover {
      color: #cc0000;
      text-decoration: underline;
    }

    .register-btn {
      width: 100%;
      padding: 14px;
      background: #ff4444;
      color: white;
      border: none;
      border-radius: 10px;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .register-btn:hover:not(:disabled) {
      background: #cc0000;
      transform: translateY(-2px);
      box-shadow: 0 10px 20px rgba(255, 68, 68, 0.3);
    }

    .register-btn:disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }

    .register-footer {
      text-align: center;
      margin-top: 20px;
    }

    .register-footer p {
      color: #cccccc;
      margin-bottom: 15px;
    }

    .register-footer a {
      color: #ff4444;
      text-decoration: none;
      font-weight: 600;
      transition: color 0.3s ease;
    }

    .register-footer a:hover {
      color: #cc0000;
      text-decoration: underline;
    }

    .back-home {
      display: inline-block;
      color: #999999;
      font-size: 0.9rem;
      margin-top: 10px;
      transition: color 0.3s ease;
    }

    .back-home:hover {
      color: #cccccc;
    }

    @media (max-width: 600px) {
      .register-card {
        padding: 30px 20px;
      }
      
      .form-row {
        grid-template-columns: 1fr;
        gap: 0;
      }
    }
  `]
})
export class RegisterComponent {
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  acceptTerms: boolean = false;
  isLoading: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onRegister() {
    if (this.password !== this.confirmPassword) {
      alert('Les mots de passe ne correspondent pas');
      return;
    }

    if (!this.acceptTerms) {
      alert('Vous devez accepter les conditions d\'utilisation');
      return;
    }

    if (this.firstName && this.lastName && this.email && this.password) {
      this.isLoading = true;
      
      const userData = {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        password: this.password
      };

      this.authService.register(userData)
        .subscribe({
          next: (response) => {
            this.authService.handleSuccessfulAuth(response);
            console.log('Inscription réussie:', response.user);
            this.router.navigate(['/']);
          },
          error: (error) => {
            console.error('Erreur d\'inscription:', error);
            this.isLoading = false;
            // Ici tu peux ajouter un message d'erreur pour l'utilisateur
            alert('Erreur d\'inscription: ' + (error.error?.message || 'Erreur lors de la création du compte'));
          }
        });
    }
  }
} 