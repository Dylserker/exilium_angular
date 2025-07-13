import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, CommonModule],
  template: `
    <div class="home-container">
      <header class="hero-section">
        <h1>Bienvenue sur Exilium</h1>
        <p>Votre plateforme de gaming moderne et sécurisée</p>
        <div class="cta-buttons">
          <a routerLink="/builds" class="btn btn-primary">Découvrir les Builds</a>
          <a routerLink="/events" class="btn btn-secondary">Voir les Événements</a>
        </div>
      </header>
      
      <section class="tabs-section">
        <div class="tabs-container">
          <div class="tabs-header">
            <button 
              class="tab-button" 
              [class.active]="activeTab === 'profile'"
              (click)="setActiveTab('profile')"
            >
              👤 Profil
            </button>
            <button 
              class="tab-button" 
              [class.active]="activeTab === 'events'"
              (click)="setActiveTab('events')"
            >
              🎮 Événements
            </button>
            <button 
              class="tab-button" 
              [class.active]="activeTab === 'contact'"
              (click)="setActiveTab('contact')"
            >
              📞 Contact
            </button>
            <button 
              class="tab-button" 
              [class.active]="activeTab === 'builds'"
              (click)="setActiveTab('builds')"
            >
              🖥️ Builds
            </button>
          </div>
          
          <div class="tab-content">
            <div class="tab-panel" [class.active]="activeTab === 'profile'">
              <div class="tab-preview">
                <h3>Gérez votre profil</h3>
                <p>Personnalisez votre profil, suivez vos statistiques et gérez vos informations personnelles.</p>
                <div class="preview-stats">
                  <div class="stat-item">
                    <span class="stat-number">12</span>
                    <span class="stat-label">Événements créés</span>
                  </div>
                  <div class="stat-item">
                    <span class="stat-number">25</span>
                    <span class="stat-label">Événements participés</span>
                  </div>
                  <div class="stat-item">
                    <span class="stat-number">8</span>
                    <span class="stat-label">Builds partagés</span>
                  </div>
                </div>
                <a routerLink="/profile" class="btn btn-primary">Voir mon profil</a>
              </div>
            </div>
            
            <div class="tab-panel" [class.active]="activeTab === 'events'">
              <div class="tab-preview">
                <h3>Découvrez les événements</h3>
                <p>Participez à des tournois, LAN parties et conventions gaming dans votre région.</p>
                <div class="preview-events">
                  <div class="event-preview">
                    <span class="event-badge upcoming">À venir</span>
                    <h4>Tournoi Gaming 2024</h4>
                    <p>15 Mars 2024 • Paris</p>
                  </div>
                  <div class="event-preview">
                    <span class="event-badge ongoing">En cours</span>
                    <h4>LAN Party Weekend</h4>
                    <p>22 Mars 2024 • Lyon</p>
                  </div>
                </div>
                <a routerLink="/events" class="btn btn-primary">Voir tous les événements</a>
              </div>
            </div>
            
            <div class="tab-panel" [class.active]="activeTab === 'contact'">
              <div class="tab-preview">
                <h3>Contactez-nous</h3>
                <p>Notre équipe est là pour vous aider. N'hésitez pas à nous contacter pour toute question.</p>
                <div class="contact-preview">
                  <div class="contact-item">
                    <span class="contact-icon">📧</span>
                    <span>contact&#64;exilium.com</span>
                  </div>
                  <div class="contact-item">
                    <span class="contact-icon">📱</span>
                    <span>+33 1 23 45 67 89</span>
                  </div>
                  <div class="contact-item">
                    <span class="contact-icon">📍</span>
                    <span>Paris, France</span>
                  </div>
                </div>
                <a routerLink="/contact" class="btn btn-primary">Nous contacter</a>
              </div>
            </div>
            
            <div class="tab-panel" [class.active]="activeTab === 'builds'">
              <div class="tab-preview">
                <h3>Partagez vos builds</h3>
                <p>Découvrez et partagez vos configurations gaming avec la communauté.</p>
                <div class="builds-preview">
                  <div class="build-preview">
                    <span class="build-badge gaming">Gaming</span>
                    <h4>Gaming Beast 2024</h4>
                    <p>RTX 4090 • €3,500</p>
                  </div>
                  <div class="build-preview">
                    <span class="build-badge budget">Budget</span>
                    <h4>Budget Gaming</h4>
                    <p>RTX 4060 • €1,200</p>
                  </div>
                </div>
                <a routerLink="/builds" class="btn btn-primary">Voir tous les builds</a>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section class="features">
        <h2>Nos fonctionnalités</h2>
        <div class="features-grid">
          <div class="feature-card">
            <h3>🔐 Sécurité</h3>
            <p>Authentification sécurisée avec protection des données</p>
          </div>
          <div class="feature-card">
            <h3>⚡ Performance</h3>
            <p>Interface rapide et responsive pour une expérience optimale</p>
          </div>
          <div class="feature-card">
            <h3>🎨 Design moderne</h3>
            <p>Interface utilisateur moderne et intuitive</p>
          </div>
          <div class="feature-card">
            <h3>🌐 Communauté</h3>
            <p>Rejoignez une communauté passionnée de gamers</p>
          </div>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .home-container {
      min-height: 100vh;
      background: linear-gradient(135deg, #1a1a1a 0%, #2d1b1b 100%);
      color: white;
    }

    .hero-section {
      text-align: center;
      padding: 100px 20px;
    }

    .hero-section h1 {
      font-size: 3.5rem;
      margin-bottom: 1rem;
      font-weight: 700;
      color: #ff4444;
      text-shadow: 0 0 30px rgba(255, 68, 68, 0.5);
    }

    .hero-section p {
      font-size: 1.5rem;
      margin-bottom: 2rem;
      opacity: 0.9;
      color: #cccccc;
    }

    .cta-buttons {
      display: flex;
      gap: 1rem;
      justify-content: center;
      flex-wrap: wrap;
    }

    .btn {
      padding: 12px 30px;
      border-radius: 25px;
      text-decoration: none;
      font-weight: 600;
      transition: all 0.3s ease;
      border: 2px solid transparent;
    }

    .btn-primary {
      background: #ff4444;
      color: white;
    }

    .btn-primary:hover {
      background: #cc0000;
      transform: translateY(-2px);
      box-shadow: 0 10px 20px rgba(255, 68, 68, 0.3);
    }

    .btn-secondary {
      background: transparent;
      color: white;
      border-color: white;
    }

    .btn-secondary:hover {
      background: white;
      color: #1a1a1a;
      transform: translateY(-2px);
    }

    .tabs-section {
      padding: 80px 20px;
      background: rgba(255, 255, 255, 0.05);
    }

    .tabs-container {
      max-width: 1200px;
      margin: 0 auto;
    }

    .tabs-header {
      display: flex;
      justify-content: center;
      gap: 10px;
      margin-bottom: 40px;
      flex-wrap: wrap;
    }

    .tab-button {
      padding: 15px 25px;
      background: rgba(255, 255, 255, 0.1);
      border: 1px solid rgba(255, 68, 68, 0.3);
      border-radius: 25px;
      color: #cccccc;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      font-size: 1rem;
    }

    .tab-button:hover {
      background: rgba(255, 68, 68, 0.2);
      border-color: #ff4444;
      color: white;
    }

    .tab-button.active {
      background: #ff4444;
      border-color: #ff4444;
      color: white;
      box-shadow: 0 0 20px rgba(255, 68, 68, 0.3);
    }

    .tab-content {
      position: relative;
      min-height: 400px;
    }

    .tab-panel {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      opacity: 0;
      transform: translateY(20px);
      transition: all 0.3s ease;
      pointer-events: none;
    }

    .tab-panel.active {
      opacity: 1;
      transform: translateY(0);
      pointer-events: all;
    }

    .tab-preview {
      text-align: center;
      padding: 40px;
      background: rgba(255, 255, 255, 0.05);
      border-radius: 20px;
      border: 1px solid rgba(255, 68, 68, 0.2);
    }

    .tab-preview h3 {
      color: #ff4444;
      font-size: 2rem;
      margin-bottom: 15px;
    }

    .tab-preview p {
      color: #cccccc;
      font-size: 1.1rem;
      margin-bottom: 30px;
      line-height: 1.6;
    }

    .preview-stats {
      display: flex;
      justify-content: center;
      gap: 40px;
      margin-bottom: 30px;
      flex-wrap: wrap;
    }

    .stat-item {
      text-align: center;
    }

    .stat-number {
      display: block;
      font-size: 2.5rem;
      font-weight: bold;
      color: #ff4444;
      text-shadow: 0 0 10px rgba(255, 68, 68, 0.5);
    }

    .stat-label {
      color: #cccccc;
      font-size: 0.9rem;
    }

    .preview-events, .builds-preview {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 20px;
      margin-bottom: 30px;
    }

    .event-preview, .build-preview {
      background: rgba(255, 255, 255, 0.1);
      padding: 20px;
      border-radius: 15px;
      border: 1px solid rgba(255, 68, 68, 0.2);
      position: relative;
    }

    .event-badge, .build-badge {
      position: absolute;
      top: 10px;
      right: 10px;
      padding: 3px 8px;
      border-radius: 12px;
      font-size: 0.7rem;
      font-weight: 600;
      text-transform: uppercase;
    }

    .event-badge.upcoming {
      background: #ff4444;
      color: white;
    }

    .event-badge.ongoing {
      background: #00cc00;
      color: white;
    }

    .build-badge.gaming {
      background: #ff4444;
      color: white;
    }

    .build-badge.budget {
      background: #44ff44;
      color: black;
    }

    .event-preview h4, .build-preview h4 {
      color: #ff4444;
      margin-bottom: 5px;
    }

    .event-preview p, .build-preview p {
      color: #cccccc;
      font-size: 0.9rem;
    }

    .contact-preview {
      display: flex;
      flex-direction: column;
      gap: 15px;
      margin-bottom: 30px;
    }

    .contact-item {
      display: flex;
      align-items: center;
      gap: 10px;
      justify-content: center;
      color: #cccccc;
    }

    .contact-icon {
      font-size: 1.2rem;
    }

    .features {
      padding: 80px 20px;
      background: rgba(255, 255, 255, 0.02);
    }

    .features h2 {
      text-align: center;
      font-size: 2.5rem;
      margin-bottom: 3rem;
      color: #ff4444;
      text-shadow: 0 0 20px rgba(255, 68, 68, 0.5);
    }

    .features-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 2rem;
      max-width: 1200px;
      margin: 0 auto;
    }

    .feature-card {
      background: rgba(255, 255, 255, 0.05);
      padding: 2rem;
      border-radius: 15px;
      text-align: center;
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 68, 68, 0.2);
      transition: transform 0.3s ease;
    }

    .feature-card:hover {
      transform: translateY(-5px);
      border-color: #ff4444;
    }

    .feature-card h3 {
      font-size: 1.5rem;
      margin-bottom: 1rem;
      color: #ff4444;
    }

    .feature-card p {
      opacity: 0.9;
      line-height: 1.6;
      color: #cccccc;
    }

    @media (max-width: 768px) {
      .hero-section h1 {
        font-size: 2.5rem;
      }
      
      .hero-section p {
        font-size: 1.2rem;
      }
      
      .cta-buttons {
        flex-direction: column;
        align-items: center;
      }
      
      .btn {
        width: 200px;
      }
      
      .tabs-header {
        flex-direction: column;
        align-items: center;
      }
      
      .tab-button {
        width: 200px;
      }
      
      .preview-stats {
        flex-direction: column;
        gap: 20px;
      }
      
      .preview-events, .builds-preview {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class HomeComponent {
  activeTab: string = 'profile';

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }
} 