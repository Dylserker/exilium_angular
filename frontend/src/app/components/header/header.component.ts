import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserService, User } from '../../services/user.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <header class="header">
      <div class="header-container">
        <div class="logo">
          <a routerLink="/" class="logo-link">
            <span class="logo-text">Exilium</span>
            <span class="logo-subtitle">Carnage</span>
          </a>
        </div>
        
        <nav class="nav-menu">
          <a routerLink="/" class="nav-link" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">
            🏠 Accueil
          </a>
          <a routerLink="/builds" class="nav-link" routerLinkActive="active">
            🖥️ Builds
          </a>
          <a routerLink="/events" class="nav-link" routerLinkActive="active">
            🎮 Événements
          </a>
          <a routerLink="/contact" class="nav-link" routerLinkActive="active">
            📞 Contact
          </a>
        </nav>
        
        <div class="user-menu">
          <ng-container *ngIf="!isLoggedIn">
            <a routerLink="/login" class="btn btn-primary">Se connecter</a>
            <a routerLink="/register" class="btn btn-secondary">S'inscrire</a>
          </ng-container>
          
          <ng-container *ngIf="isLoggedIn">
            <div class="user-info">
              <span class="user-name">{{ currentUser?.firstName }}</span>
              <div class="user-avatar">
                {{ currentUser?.firstName?.charAt(0) }}{{ currentUser?.lastName?.charAt(0) }}
              </div>
            </div>
            <div class="dropdown-menu">
              <a routerLink="/profile" class="dropdown-item">👤 Mon Profil</a>
              <button (click)="logout()" class="dropdown-item">🚪 Se déconnecter</button>
            </div>
          </ng-container>
        </div>
      </div>
    </header>
  `,
  styles: [`
    .header {
      background: rgba(26, 26, 26, 0.95);
      backdrop-filter: blur(10px);
      border-bottom: 1px solid rgba(255, 68, 68, 0.2);
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 1000;
    }

    .header-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 70px;
    }

    .logo-link {
      text-decoration: none;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .logo-text {
      font-size: 1.8rem;
      font-weight: 700;
      color: #ff4444;
      text-shadow: 0 0 20px rgba(255, 68, 68, 0.5);
    }

    .logo-subtitle {
      font-size: 0.8rem;
      color: #cccccc;
      margin-top: -5px;
    }

    .nav-menu {
      display: flex;
      gap: 30px;
    }

    .nav-link {
      color: #cccccc;
      text-decoration: none;
      font-weight: 500;
      transition: all 0.3s ease;
      padding: 8px 16px;
      border-radius: 20px;
    }

    .nav-link:hover {
      color: #ff4444;
      background: rgba(255, 68, 68, 0.1);
    }

    .nav-link.active {
      color: #ff4444;
      background: rgba(255, 68, 68, 0.2);
    }

    .user-menu {
      display: flex;
      align-items: center;
      gap: 15px;
      position: relative;
    }

    .btn {
      padding: 8px 20px;
      border-radius: 20px;
      text-decoration: none;
      font-weight: 600;
      transition: all 0.3s ease;
      border: 2px solid transparent;
      cursor: pointer;
    }

    .btn-primary {
      background: #ff4444;
      color: white;
    }

    .btn-primary:hover {
      background: #cc0000;
      transform: translateY(-2px);
    }

    .btn-secondary {
      background: transparent;
      color: white;
      border-color: white;
    }

    .btn-secondary:hover {
      background: white;
      color: #1a1a1a;
    }

    .user-info {
      display: flex;
      align-items: center;
      gap: 10px;
      cursor: pointer;
      padding: 8px 12px;
      border-radius: 20px;
      transition: all 0.3s ease;
    }

    .user-info:hover {
      background: rgba(255, 255, 255, 0.1);
    }

    .user-name {
      color: #cccccc;
      font-weight: 500;
    }

    .user-avatar {
      width: 35px;
      height: 35px;
      background: linear-gradient(135deg, #ff4444, #cc0000);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-weight: 600;
      font-size: 0.9rem;
    }

    .dropdown-menu {
      position: absolute;
      top: 100%;
      right: 0;
      background: rgba(26, 26, 26, 0.95);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 68, 68, 0.2);
      border-radius: 10px;
      padding: 10px 0;
      min-width: 150px;
      opacity: 0;
      visibility: hidden;
      transform: translateY(-10px);
      transition: all 0.3s ease;
    }

    .user-info:hover + .dropdown-menu,
    .dropdown-menu:hover {
      opacity: 1;
      visibility: visible;
      transform: translateY(0);
    }

    .dropdown-item {
      display: block;
      padding: 10px 20px;
      color: #cccccc;
      text-decoration: none;
      transition: all 0.3s ease;
      border: none;
      background: none;
      width: 100%;
      text-align: left;
      cursor: pointer;
      font-size: 0.9rem;
    }

    .dropdown-item:hover {
      background: rgba(255, 68, 68, 0.1);
      color: #ff4444;
    }

    @media (max-width: 768px) {
      .nav-menu {
        display: none;
      }
      
      .header-container {
        padding: 0 15px;
      }
      
      .logo-text {
        font-size: 1.5rem;
      }
    }
  `]
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean = false;
  currentUser: User | null = null;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
    this.currentUser = this.userService.getCurrentUser();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
} 