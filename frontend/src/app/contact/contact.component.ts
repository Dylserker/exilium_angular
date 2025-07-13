import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="contact-container">
      <div class="contact-header">
        <h1>Contact</h1>
        <p>Nous sommes là pour vous aider</p>
      </div>
      
      <div class="contact-content">
        <div class="contact-info">
          <h2>Informations de contact</h2>
          <div class="info-items">
            <div class="info-item">
              <div class="info-icon">📧</div>
              <div class="info-details">
                <h3>Email</h3>
                <p>contact&#64;exilium.com</p>
              </div>
            </div>
            <div class="info-item">
              <div class="info-icon">📱</div>
              <div class="info-details">
                <h3>Téléphone</h3>
                <p>+33 1 23 45 67 89</p>
              </div>
            </div>
            <div class="info-item">
              <div class="info-icon">📍</div>
              <div class="info-details">
                <h3>Adresse</h3>
                <p>123 Rue du Gaming<br>75001 Paris, France</p>
              </div>
            </div>
            <div class="info-item">
              <div class="info-icon">⏰</div>
              <div class="info-details">
                <h3>Horaires</h3>
                <p>Lun-Ven: 9h-18h<br>Sam: 10h-16h</p>
              </div>
            </div>
          </div>
          
          <div class="social-links">
            <h3>Suivez-nous</h3>
            <div class="social-icons">
              <a href="#" class="social-icon">📘</a>
              <a href="#" class="social-icon">🐦</a>
              <a href="#" class="social-icon">📷</a>
              <a href="#" class="social-icon">🎮</a>
            </div>
          </div>
        </div>
        
        <div class="contact-form-container">
          <h2>Envoyez-nous un message</h2>
          <form class="contact-form" (ngSubmit)="onSubmit()">
            <div class="form-row">
              <div class="form-group">
                <label for="firstName">Prénom</label>
                <input 
                  type="text" 
                  id="firstName" 
                  name="firstName" 
                  [(ngModel)]="firstName" 
                  required
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
              >
            </div>
            
            <div class="form-group">
              <label for="subject">Sujet</label>
              <select id="subject" name="subject" [(ngModel)]="subject" required>
                <option value="">Choisissez un sujet</option>
                <option value="support">Support technique</option>
                <option value="partnership">Partenariat</option>
                <option value="feedback">Retour d'expérience</option>
                <option value="other">Autre</option>
              </select>
            </div>
            
            <div class="form-group">
              <label for="message">Message</label>
              <textarea 
                id="message" 
                name="message" 
                [(ngModel)]="message" 
                rows="6" 
                required
                placeholder="Votre message..."
              ></textarea>
            </div>
            
            <button type="submit" class="btn btn-primary" [disabled]="isSubmitting">
              {{ isSubmitting ? 'Envoi...' : 'Envoyer le message' }}
            </button>
          </form>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .contact-container {
      min-height: 100vh;
      background: linear-gradient(135deg, #1a1a1a 0%, #2d1b1b 100%);
      color: white;
      padding: 20px;
    }

    .contact-header {
      text-align: center;
      margin-bottom: 40px;
    }

    .contact-header h1 {
      font-size: 3rem;
      margin-bottom: 10px;
      color: #ff4444;
      text-shadow: 0 0 20px rgba(255, 68, 68, 0.5);
    }

    .contact-header p {
      font-size: 1.2rem;
      color: #cccccc;
    }

    .contact-content {
      max-width: 1200px;
      margin: 0 auto;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 50px;
    }

    .contact-info h2, .contact-form-container h2 {
      color: #ff4444;
      margin-bottom: 30px;
      font-size: 1.8rem;
    }

    .info-items {
      display: flex;
      flex-direction: column;
      gap: 25px;
      margin-bottom: 40px;
    }

    .info-item {
      display: flex;
      align-items: center;
      gap: 20px;
      padding: 20px;
      background: rgba(255, 255, 255, 0.05);
      border-radius: 15px;
      border: 1px solid rgba(255, 68, 68, 0.2);
    }

    .info-icon {
      font-size: 2rem;
      width: 60px;
      height: 60px;
      background: linear-gradient(135deg, #ff4444, #cc0000);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .info-details h3 {
      color: #ff4444;
      margin-bottom: 5px;
      font-size: 1.1rem;
    }

    .info-details p {
      color: #cccccc;
      line-height: 1.4;
    }

    .social-links h3 {
      color: #ff4444;
      margin-bottom: 15px;
    }

    .social-icons {
      display: flex;
      gap: 15px;
    }

    .social-icon {
      width: 50px;
      height: 50px;
      background: rgba(255, 255, 255, 0.1);
      border: 2px solid rgba(255, 68, 68, 0.3);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
      text-decoration: none;
      transition: all 0.3s ease;
    }

    .social-icon:hover {
      background: #ff4444;
      border-color: #ff4444;
      transform: translateY(-3px);
    }

    .contact-form-container {
      background: rgba(255, 255, 255, 0.05);
      border-radius: 20px;
      padding: 40px;
      border: 1px solid rgba(255, 68, 68, 0.2);
    }

    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
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
    }

    .form-group input,
    .form-group select,
    .form-group textarea {
      width: 100%;
      padding: 12px 16px;
      background: rgba(255, 255, 255, 0.1);
      border: 1px solid rgba(255, 68, 68, 0.3);
      border-radius: 8px;
      color: white;
      font-size: 1rem;
      box-sizing: border-box;
    }

    .form-group input:focus,
    .form-group select:focus,
    .form-group textarea:focus {
      outline: none;
      border-color: #ff4444;
      box-shadow: 0 0 10px rgba(255, 68, 68, 0.3);
    }

    .form-group textarea {
      resize: vertical;
      min-height: 120px;
    }

    .btn {
      width: 100%;
      padding: 14px;
      background: #ff4444;
      color: white;
      border: none;
      border-radius: 8px;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .btn:hover:not(:disabled) {
      background: #cc0000;
      transform: translateY(-2px);
    }

    .btn:disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }

    @media (max-width: 768px) {
      .contact-content {
        grid-template-columns: 1fr;
        gap: 30px;
      }
      
      .form-row {
        grid-template-columns: 1fr;
      }
      
      .info-item {
        flex-direction: column;
        text-align: center;
      }
    }
  `]
})
export class ContactComponent {
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  subject: string = '';
  message: string = '';
  isSubmitting: boolean = false;

  onSubmit() {
    if (!this.firstName || !this.lastName || !this.email || !this.subject || !this.message) {
      alert('Veuillez remplir tous les champs');
      return;
    }

    this.isSubmitting = true;
    
    // Simulation d'envoi
    setTimeout(() => {
      console.log('Message envoyé:', {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        subject: this.subject,
        message: this.message
      });
      
      alert('Message envoyé avec succès !');
      this.resetForm();
      this.isSubmitting = false;
    }, 1000);
  }

  private resetForm() {
    this.firstName = '';
    this.lastName = '';
    this.email = '';
    this.subject = '';
    this.message = '';
  }
} 