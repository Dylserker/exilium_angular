import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <footer class="footer">
      <div class="footer-container">
        <div class="footer-section">
          <h3>Exilium Carnage</h3>
          <p>Votre communauté Warframe de référence. Partagez vos builds, participez aux événements et rejoignez une communauté passionnée.</p>
          <div class="social-links">
            <a href="#" class="social-link">📘 Discord</a>
            <a href="#" class="social-link">🐦 Twitter</a>
            <a href="#" class="social-link">📷 Instagram</a>
          </div>
        </div>
        
        <div class="footer-section">
          <h4>Navigation</h4>
          <ul class="footer-links">
            <li><a routerLink="/">🏠 Accueil</a></li>
            <li><a routerLink="/builds">🖥️ Builds</a></li>
            <li><a routerLink="/events">🎮 Événements</a></li>
            <li><a routerLink="/contact">📞 Contact</a></li>
          </ul>
        </div>
        
        <div class="footer-section">
          <h4>Support</h4>
          <ul class="footer-links">
            <li><a href="#">❓ FAQ</a></li>
            <li><a href="#">📖 Guide</a></li>
            <li><a href="#">🛠️ Support</a></li>
            <li><a href="#">📋 Conditions</a></li>
          </ul>
        </div>
        
        <div class="footer-section">
          <h4>Contact</h4>
          <div class="contact-info">
            <p>📧 contact&#64;exilium.com</p>
            <p>📱 +33 1 23 45 67 89</p>
            <p>📍 Paris, France</p>
          </div>
        </div>
      </div>
      
      <div class="footer-bottom">
        <div class="footer-bottom-container">
          <p>&copy; 2024 Exilium Carnage. Tous droits réservés.</p>
          <p>Propulsé par Angular & NestJS</p>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .footer {
      background: linear-gradient(135deg, #1a1a1a 0%, #2d1b1b 100%);
      color: white;
      margin-top: 100px;
    }

    .footer-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 60px 20px 40px;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 40px;
    }

    .footer-section h3 {
      color: #ff4444;
      font-size: 1.5rem;
      margin-bottom: 15px;
      text-shadow: 0 0 10px rgba(255, 68, 68, 0.3);
    }

    .footer-section h4 {
      color: #ff4444;
      font-size: 1.2rem;
      margin-bottom: 15px;
    }

    .footer-section p {
      color: #cccccc;
      line-height: 1.6;
      margin-bottom: 20px;
    }

    .social-links {
      display: flex;
      gap: 15px;
    }

    .social-link {
      color: #cccccc;
      text-decoration: none;
      padding: 8px 12px;
      border-radius: 20px;
      background: rgba(255, 255, 255, 0.1);
      transition: all 0.3s ease;
      font-size: 0.9rem;
    }

    .social-link:hover {
      background: rgba(255, 68, 68, 0.2);
      color: #ff4444;
      transform: translateY(-2px);
    }

    .footer-links {
      list-style: none;
      padding: 0;
    }

    .footer-links li {
      margin-bottom: 10px;
    }

    .footer-links a {
      color: #cccccc;
      text-decoration: none;
      transition: color 0.3s ease;
    }

    .footer-links a:hover {
      color: #ff4444;
    }

    .contact-info p {
      margin-bottom: 8px;
      color: #cccccc;
    }

    .footer-bottom {
      border-top: 1px solid rgba(255, 68, 68, 0.2);
      padding: 20px 0;
    }

    .footer-bottom-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 10px;
    }

    .footer-bottom p {
      color: #999999;
      font-size: 0.9rem;
      margin: 0;
    }

    @media (max-width: 768px) {
      .footer-container {
        grid-template-columns: 1fr;
        gap: 30px;
        padding: 40px 20px 30px;
      }
      
      .footer-bottom-container {
        flex-direction: column;
        text-align: center;
      }
    }
  `]
})
export class FooterComponent {} 