import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  template: `
    <div class="login-container">
      <div class="login-card">
        <div class="login-header">
          <h1>Connexion</h1>
          <p>Connectez-vous à votre compte</p>
        </div>
        
        <form class="login-form" (ngSubmit)="onLogin()">
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
              placeholder="Votre mot de passe"
            >
          </div>
          
          <div class="form-options">
            <label class="checkbox-label">
              <input type="checkbox" [(ngModel)]="rememberMe" name="rememberMe">
              <span>Se souvenir de moi</span>
            </label>
            <a href="#" class="forgot-password">Mot de passe oublié ?</a>
          </div>
          
          <button type="submit" class="login-btn" [disabled]="isLoading">
            {{ isLoading ? 'Connexion...' : 'Se connecter' }}
          </button>
        </form>
        
        <div class="login-footer">
          <p>Pas encore de compte ? <a routerLink="/register">S'inscrire</a></p>
          <a routerLink="/" class="back-home">← Retour à l'accueil</a>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .login-container {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, #1a1a1a 0%, #2d1b1b 100%);
      padding: 20px;
    }

    .login-card {
      background: rgba(255, 255, 255, 0.05);
      border-radius: 20px;
      padding: 40px;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
      width: 100%;
      max-width: 400px;
      border: 1px solid rgba(255, 68, 68, 0.2);
      backdrop-filter: blur(10px);
    }

    .login-header {
      text-align: center;
      margin-bottom: 30px;
    }

    .login-header h1 {
      color: #ff4444;
      font-size: 2rem;
      margin-bottom: 10px;
      font-weight: 700;
      text-shadow: 0 0 20px rgba(255, 68, 68, 0.5);
    }

    .login-header p {
      color: #cccccc;
      font-size: 1rem;
    }

    .login-form {
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
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 25px;
      flex-wrap: wrap;
      gap: 10px;
    }

    .checkbox-label {
      display: flex;
      align-items: center;
      gap: 8px;
      color: #cccccc;
      font-size: 0.9rem;
      cursor: pointer;
    }

    .checkbox-label input[type="checkbox"] {
      width: auto;
      margin: 0;
    }

    .forgot-password {
      color: #ff4444;
      text-decoration: none;
      font-size: 0.9rem;
      transition: color 0.3s ease;
    }

    .forgot-password:hover {
      color: #cc0000;
      text-decoration: underline;
    }

    .login-btn {
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

    .login-btn:hover:not(:disabled) {
      background: #cc0000;
      transform: translateY(-2px);
      box-shadow: 0 10px 20px rgba(255, 68, 68, 0.3);
    }

    .login-btn:disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }

    .login-footer {
      text-align: center;
      margin-top: 20px;
    }

    .login-footer p {
      color: #cccccc;
      margin-bottom: 15px;
    }

    .login-footer a {
      color: #ff4444;
      text-decoration: none;
      font-weight: 600;
      transition: color 0.3s ease;
    }

    .login-footer a:hover {
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

    @media (max-width: 480px) {
      .login-card {
        padding: 30px 20px;
      }
      
      .form-options {
        flex-direction: column;
        align-items: flex-start;
      }
    }
  `]
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  rememberMe: boolean = false;
  isLoading: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onLogin() {
    if (this.email && this.password) {
      this.isLoading = true;
      
      this.authService.login({ email: this.email, password: this.password })
        .subscribe({
          next: (response) => {
            this.authService.handleSuccessfulAuth(response);
            console.log('Connexion réussie:', response.user);
            this.router.navigate(['/']);
          },
          error: (error) => {
            console.error('Erreur de connexion:', error);
            this.isLoading = false;
            // Ici tu peux ajouter un message d'erreur pour l'utilisateur
            alert('Erreur de connexion: ' + (error.error?.message || 'Email ou mot de passe incorrect'));
          }
        });
    }
  }
} 