import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UserService, User } from '../services/user.service';
import { TwoFactorService } from '../services/two-factor.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  template: `
    <div class="profile-container">
      <div class="profile-header">
        <h1>Mon Profil</h1>
        <p>Gérez vos informations personnelles et vos préférences</p>
      </div>
      
      <div class="profile-content">
        <div class="profile-card">
          <div class="profile-avatar">
            <div class="avatar-placeholder">
              {{ currentUser?.firstName?.charAt(0) }}{{ currentUser?.lastName?.charAt(0) }}
            </div>
            <button class="avatar-edit-btn" (click)="editAvatar()">📷</button>
          </div>
          
          <div class="profile-info">
            <h2>{{ currentUser?.firstName }} {{ currentUser?.lastName }}</h2>
            <p class="user-email">{{ currentUser?.email }}</p>
            <p class="user-role">Rôle: {{ currentUser?.role }}</p>
          </div>
          
          <div class="profile-stats">
            <div class="stat-item">
              <span class="stat-number">{{ userStats.eventsCreated }}</span>
              <span class="stat-label">Événements créés</span>
            </div>
            <div class="stat-item">
              <span class="stat-number">{{ userStats.eventsParticipated }}</span>
              <span class="stat-label">Événements participés</span>
            </div>
            <div class="stat-item">
              <span class="stat-number">{{ userStats.buildsShared }}</span>
              <span class="stat-label">Builds partagés</span>
            </div>
          </div>
        </div>
        
        <div class="profile-sections">
          <!-- Section Informations personnelles -->
          <div class="section-card">
            <div class="section-header">
              <h3>Informations personnelles</h3>
              <button class="edit-btn" (click)="toggleEditMode()" *ngIf="!isEditing">
                ✏️ Modifier
              </button>
            </div>
            
            <div class="info-grid" *ngIf="!isEditing">
              <div class="info-item">
                <label>Prénom</label>
                <span>{{ currentUser?.firstName }}</span>
              </div>
              <div class="info-item">
                <label>Nom</label>
                <span>{{ currentUser?.lastName }}</span>
              </div>
              <div class="info-item">
                <label>Email</label>
                <span>{{ currentUser?.email }}</span>
              </div>
              <div class="info-item">
                <label>Rôle</label>
                <span>{{ currentUser?.role }}</span>
              </div>
            </div>
            
            <form class="edit-form" *ngIf="isEditing" (ngSubmit)="saveProfile()">
              <div class="form-row">
                <div class="form-group">
                  <label for="firstName">Prénom</label>
                  <input 
                    type="text" 
                    id="firstName" 
                    name="firstName"
                    [(ngModel)]="editForm.firstName" 
                    required
                  >
                </div>
                <div class="form-group">
                  <label for="lastName">Nom</label>
                  <input 
                    type="text" 
                    id="lastName" 
                    name="lastName"
                    [(ngModel)]="editForm.lastName" 
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
                  [(ngModel)]="editForm.email" 
                  required
                >
              </div>
              
              <div class="form-actions">
                <button type="submit" class="btn btn-primary" [disabled]="isSaving">
                  {{ isSaving ? 'Sauvegarde...' : '💾 Sauvegarder' }}
                </button>
                <button type="button" class="btn btn-secondary" (click)="cancelEdit()" [disabled]="isSaving">
                  Annuler
                </button>
              </div>
            </form>
          </div>
          
          <!-- Section Sécurité -->
          <div class="section-card">
            <h3>Sécurité</h3>
            <div class="security-options">
              <div class="security-item">
                <div class="security-info">
                  <h4>🔒 Changer le mot de passe</h4>
                  <p>Mettez à jour votre mot de passe pour plus de sécurité</p>
                </div>
                <button class="btn btn-secondary" (click)="changePassword()">
                  Modifier
                </button>
              </div>
              <form *ngIf="showChangePassword" (ngSubmit)="submitChangePassword()" class="change-password-form">
                <div class="form-group">
                  <label for="currentPassword">Mot de passe actuel</label>
                  <input type="password" id="currentPassword" [(ngModel)]="passwordForm.currentPassword" name="currentPassword" required>
                </div>
                <div class="form-group">
                  <label for="newPassword">Nouveau mot de passe</label>
                  <input type="password" id="newPassword" [(ngModel)]="passwordForm.newPassword" name="newPassword" required>
                </div>
                <div class="form-group">
                  <label for="confirmPassword">Confirmer le nouveau mot de passe</label>
                  <input type="password" id="confirmPassword" [(ngModel)]="passwordForm.confirmPassword" name="confirmPassword" required>
                </div>
                <div class="form-actions">
                  <button type="submit" class="btn btn-primary" [disabled]="isPasswordLoading">
                    {{ isPasswordLoading ? 'Sauvegarde...' : 'Sauvegarder' }}
                  </button>
                  <button type="button" class="btn btn-secondary" (click)="changePassword()" [disabled]="isPasswordLoading">
                    Annuler
                  </button>
                </div>
              </form>
              
              <div class="security-item">
                <div class="security-info">
                  <h4>🔐 Authentification à deux facteurs</h4>
                  <p>Ajoutez une couche de sécurité supplémentaire à votre compte</p>
                  <span class="status-badge" [class]="twoFactorStatus">
                    {{ twoFactorStatus === 'enabled' ? 'Activée' : 'Désactivée' }}
                  </span>
                </div>
                <button 
                  class="btn" 
                  [class]="twoFactorStatus === 'enabled' ? 'btn-danger' : 'btn-success'"
                  (click)="toggleTwoFactor()"
                  [disabled]="isTwoFactorLoading"
                >
                  {{ isTwoFactorLoading ? 'Chargement...' : (twoFactorStatus === 'enabled' ? 'Désactiver' : 'Activer') }}
                </button>
              </div>
              
              <div class="security-item" *ngIf="showTwoFactorSetup">
                <div class="security-info">
                  <h4>📱 Configuration 2FA</h4>
                  <p>Scannez ce QR code avec votre application d'authentification</p>
                  <div class="qr-code-container">
                    <img [src]="qrCodeUrl" alt="QR Code 2FA" class="qr-code">
                    <div class="qr-code-info">
                      <p><strong>Code de vérification :</strong></p>
                      <input 
                        type="text" 
                        [(ngModel)]="verificationCode" 
                        placeholder="Entrez le code à 6 chiffres"
                        class="verification-input"
                        maxlength="6"
                      >
                      <button 
                        class="btn btn-primary" 
                        (click)="verifyTwoFactor()"
                        [disabled]="!verificationCode || verificationCode.length !== 6"
                      >
                        Vérifier
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Section Mes Builds -->
          <div class="section-card">
            <div class="section-header">
              <h3>Mes Builds</h3>
              <a routerLink="/builds" class="btn btn-primary">➕ Nouveau Build</a>
            </div>
            <div class="builds-list">
              <div class="build-item" *ngFor="let build of userBuilds">
                <div class="build-info">
                  <h4>{{ build.title }}</h4>
                  <p>{{ build.description }}</p>
                  <span class="build-category" [class]="build.category">{{ build.category }}</span>
                </div>
                <div class="build-actions">
                  <button class="action-btn" (click)="editBuild(build)">✏️</button>
                  <button class="action-btn" (click)="deleteBuild(build)">🗑️</button>
                </div>
              </div>
              <div class="empty-state" *ngIf="userBuilds.length === 0">
                <p>Vous n'avez pas encore créé de builds</p>
                <a routerLink="/builds" class="btn btn-primary">Créer votre premier build</a>
              </div>
            </div>
          </div>
          
          <!-- Section Mes Événements -->
          <div class="section-card">
            <div class="section-header">
              <h3>Mes Événements</h3>
              <a routerLink="/events" class="btn btn-primary">➕ Nouvel Événement</a>
            </div>
            <div class="events-list">
              <div class="event-item" *ngFor="let event of userEvents">
                <div class="event-info">
                  <h4>{{ event.title }}</h4>
                  <p>{{ event.date }} • {{ event.location }}</p>
                  <span class="event-status" [class]="event.status">{{ event.status }}</span>
                </div>
                <div class="event-actions">
                  <button class="action-btn" (click)="editEvent(event)">✏️</button>
                  <button class="action-btn" (click)="deleteEvent(event)">🗑️</button>
                </div>
              </div>
              <div class="empty-state" *ngIf="userEvents.length === 0">
                <p>Vous n'avez pas encore créé d'événements</p>
                <a routerLink="/events" class="btn btn-primary">Créer votre premier événement</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .profile-container {
      min-height: 100vh;
      background: linear-gradient(135deg, #1a1a1a 0%, #2d1b1b 100%);
      color: white;
      padding: 20px;
    }

    .profile-header {
      text-align: center;
      margin-bottom: 40px;
    }

    .profile-header h1 {
      font-size: 3rem;
      margin-bottom: 10px;
      color: #ff4444;
      text-shadow: 0 0 20px rgba(255, 68, 68, 0.5);
    }

    .profile-header p {
      font-size: 1.2rem;
      color: #cccccc;
    }

    .profile-content {
      max-width: 1200px;
      margin: 0 auto;
    }

    .profile-card {
      background: rgba(255, 255, 255, 0.05);
      border-radius: 20px;
      padding: 40px;
      margin-bottom: 30px;
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 68, 68, 0.2);
      display: flex;
      gap: 40px;
      align-items: flex-start;
    }

    .profile-avatar {
      flex-shrink: 0;
    }

    .avatar-placeholder {
      width: 120px;
      height: 120px;
      background: linear-gradient(135deg, #ff4444, #cc0000);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 3rem;
      border: 4px solid rgba(255, 255, 255, 0.1);
    }

    .profile-info {
      flex: 1;
    }

    .profile-info h2 {
      color: #ff4444;
      margin-bottom: 20px;
      font-size: 1.8rem;
    }

    .user-email {
      color: #cccccc;
      margin-bottom: 10px;
    }

    .user-role {
      color: #ff4444;
      font-weight: 600;
      font-size: 1.1rem;
    }

    .profile-stats {
      display: flex;
      gap: 20px;
      margin-top: 30px;
    }

    .stat-item {
      text-align: center;
    }

    .stat-number {
      font-size: 2.5rem;
      font-weight: bold;
      color: #ff4444;
      text-shadow: 0 0 10px rgba(255, 68, 68, 0.5);
    }

    .stat-label {
      color: #cccccc;
      font-size: 0.9rem;
      margin-top: 5px;
    }

    .profile-sections {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 20px;
    }

    .section-card {
      background: rgba(255, 255, 255, 0.05);
      border-radius: 15px;
      padding: 30px;
      border: 1px solid rgba(255, 68, 68, 0.2);
      transition: transform 0.3s ease;
    }

    .section-card:hover {
      transform: translateY(-5px);
      border-color: #ff4444;
    }

    .section-card h3 {
      color: #cccccc;
      margin-bottom: 20px;
      font-size: 1.3rem;
    }

    .info-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 20px;
      margin-bottom: 20px;
    }

    .info-item label {
      display: block;
      margin-bottom: 8px;
      color: #cccccc;
      font-weight: 600;
    }

    .info-item span {
      color: white;
      font-size: 1rem;
    }

    .btn {
      padding: 12px 24px;
      border: none;
      border-radius: 8px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      text-decoration: none;
      display: inline-block;
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
      color: #ff4444;
      border: 2px solid #ff4444;
    }

    .btn-secondary:hover {
      background: #ff4444;
      color: white;
      transform: translateY(-2px);
    }

    .builds-list, .events-list {
      margin-top: 20px;
    }

    .build-item, .event-item {
      background: rgba(255, 255, 255, 0.03);
      border-radius: 10px;
      padding: 15px;
      margin-bottom: 10px;
      border: 1px solid rgba(255, 68, 68, 0.1);
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .build-item .build-info, .event-item .event-info {
      flex: 1;
    }

    .build-item h4, .event-item h4 {
      color: #ff4444;
      margin-bottom: 5px;
      font-size: 1.1rem;
    }

    .build-item p, .event-item p {
      color: #cccccc;
      font-size: 0.9rem;
      margin-bottom: 10px;
    }

    .build-category, .event-status {
      display: inline-block;
      padding: 5px 10px;
      border-radius: 5px;
      font-size: 0.8rem;
      font-weight: 600;
    }

    .build-category.warframe {
      background-color: #4444ff;
      color: white;
    }

    .build-category.primary {
      background-color: #ff4444;
      color: white;
    }

    .event-status.upcoming {
      background-color: #44ff44;
      color: white;
    }

    .event-status.ongoing {
      background-color: #ffcc00;
      color: black;
    }

    .build-item .build-actions, .event-item .event-actions {
      display: flex;
      gap: 10px;
    }

    .action-btn {
      background: none;
      border: none;
      font-size: 1.2rem;
      color: #cccccc;
      cursor: pointer;
      transition: color 0.3s ease;
    }

    .action-btn:hover {
      color: #ff4444;
    }

    .empty-state {
      text-align: center;
      padding: 20px;
      color: #cccccc;
      font-style: italic;
    }

    .section-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
    }

    .edit-btn {
      background: #ff4444;
      color: white;
      padding: 8px 15px;
      border-radius: 8px;
      font-size: 0.9rem;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.3s ease;
    }

    .edit-btn:hover {
      background: #cc0000;
    }

    .edit-form {
      display: flex;
      flex-direction: column;
      gap: 15px;
    }

    .form-row {
      display: flex;
      gap: 20px;
    }

    .form-group {
      flex: 1;
    }

    .form-group label {
      display: block;
      margin-bottom: 8px;
      color: #cccccc;
      font-weight: 600;
    }

    .form-group input {
      width: 100%;
      padding: 10px;
      border: 1px solid #555;
      border-radius: 8px;
      background: #333;
      color: white;
    }

    .form-group input:focus {
      outline: none;
      border-color: #ff4444;
      box-shadow: 0 0 10px rgba(255, 68, 68, 0.3);
    }

    .form-actions {
      display: flex;
      justify-content: flex-end;
      gap: 15px;
      margin-top: 20px;
    }

    .avatar-edit-btn {
      position: absolute;
      top: 10px;
      right: 10px;
      background: none;
      border: none;
      font-size: 1.5rem;
      color: #cccccc;
      cursor: pointer;
      transition: color 0.3s ease;
    }

    .avatar-edit-btn:hover {
      color: #ff4444;
    }

    .security-options {
      display: flex;
      flex-direction: column;
      gap: 15px;
    }

    .security-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: rgba(255, 255, 255, 0.03);
      border-radius: 10px;
      padding: 15px;
      border: 1px solid rgba(255, 68, 68, 0.1);
    }

    .security-info {
      flex: 1;
    }

    .security-info h4 {
      color: #ff4444;
      margin-bottom: 5px;
      font-size: 1rem;
    }

    .security-info p {
      color: #cccccc;
      font-size: 0.8rem;
      margin-bottom: 10px;
    }

    .status-badge {
      display: inline-block;
      padding: 5px 10px;
      border-radius: 5px;
      font-size: 0.8rem;
      font-weight: 600;
    }

    .status-badge.enabled {
      background-color: #44ff44;
      color: white;
    }

    .status-badge.disabled {
      background-color: #ff4444;
      color: white;
    }

    .qr-code-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 15px;
    }

    .qr-code {
      width: 150px;
      height: 150px;
      margin-bottom: 10px;
      border: 1px solid #555;
      border-radius: 10px;
    }

    .qr-code-info {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .verification-input {
      width: 100%;
      padding: 10px;
      border: 1px solid #555;
      border-radius: 8px;
      background: #333;
      color: white;
      text-align: center;
      font-size: 1.2rem;
    }

    .verification-input:focus {
      outline: none;
      border-color: #ff4444;
      box-shadow: 0 0 10px rgba(255, 68, 68, 0.3);
    }

    .btn-danger {
      background: #ff4444;
      color: white;
    }

    .btn-danger:hover {
      background: #cc0000;
    }

    .btn-success {
      background: #44ff44;
      color: white;
    }

    .btn-success:hover {
      background: #33cc33;
    }

    .change-password-form {
      display: flex;
      flex-direction: column;
      gap: 15px;
      margin-top: 20px;
    }

    .change-password-form .form-group {
      flex: none; /* Override flex to prevent form-row from breaking */
    }

    @media (max-width: 768px) {
      .profile-card {
        flex-direction: column;
        text-align: center;
      }
      
      .profile-stats {
        flex-direction: column;
        align-items: center;
      }

      .profile-sections {
        grid-template-columns: 1fr;
      }

      .form-row {
        flex-direction: column;
      }

      .form-actions {
        justify-content: center;
      }
    }
  `]
})
export class ProfileComponent implements OnInit {
  currentUser: User | null = null;
  isEditing: boolean = false;
  editForm: any = {};
  isSaving: boolean = false;
  isTwoFactorLoading: boolean = false;
  showTwoFactorSetup: boolean = false;
  qrCodeUrl: string | null = null;
  verificationCode: string = '';
  twoFactorStatus: 'enabled' | 'disabled' = 'disabled';
  showChangePassword: boolean = false;
  passwordForm = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  };
  isPasswordLoading: boolean = false;

  userStats: any = {
    eventsCreated: 0,
    eventsParticipated: 0,
    buildsShared: 0,
  };

  userBuilds: any[] = [
    { id: 1, title: 'Saryn Prime - Spore Build', description: 'Build optimisé pour les missions de survie', category: 'warframe' },
    { id: 2, title: 'Rubico Prime - Eidolon Hunter', description: 'Build spécialisé pour la chasse aux Eidolons', category: 'primary' },
  ];

  userEvents: any[] = [
    { id: 1, title: 'Tournoi Gaming 2024', date: '15 Mars 2024', location: 'Paris', status: 'upcoming' },
    { id: 2, title: 'LAN Party Weekend', date: '22 Mars 2024', location: 'Lyon', status: 'ongoing' },
  ];

  constructor(private userService: UserService, private twoFactorService: TwoFactorService) {}

  ngOnInit(): void {
    this.currentUser = this.userService.getCurrentUser();
    this.initializeEditForm();
    this.updateStats();
    this.loadTwoFactorStatus();
  }

  initializeEditForm(): void {
    if (this.currentUser) {
      this.editForm = {
        firstName: this.currentUser.firstName,
        lastName: this.currentUser.lastName,
        email: this.currentUser.email,
      };
    }
  }

  toggleEditMode(): void {
    this.isEditing = !this.isEditing;
    if (!this.isEditing) {
      this.initializeEditForm(); // Reset form when canceling
    }
  }

  saveProfile(): void {
    this.isSaving = true;
    this.userService.updateProfile(this.editForm).subscribe({
      next: (response) => {
        // Mettre à jour l'utilisateur local
        this.currentUser = response.user;
        this.userService.updateUser(response.user);
        this.isEditing = false;
        alert('Profil mis à jour avec succès !');
      },
      error: (error) => {
        console.error('Erreur lors de la sauvegarde:', error);
        alert('Erreur lors de la sauvegarde du profil');
      },
      complete: () => {
        this.isSaving = false;
      }
    });
  }

  cancelEdit(): void {
    this.isEditing = false;
    this.initializeEditForm(); // Revert to current user's data
  }

  editAvatar(): void {
    console.log('Edit avatar clicked');
    // Implement avatar editing logic here
  }

  changePassword(): void {
    this.showChangePassword = !this.showChangePassword;
    this.passwordForm = { currentPassword: '', newPassword: '', confirmPassword: '' };
  }

  submitChangePassword(): void {
    this.isPasswordLoading = true;
    this.userService.changePassword(
      this.passwordForm.currentPassword,
      this.passwordForm.newPassword,
      this.passwordForm.confirmPassword
    ).subscribe({
      next: () => {
        alert('Mot de passe modifié avec succès !');
        this.showChangePassword = false;
        this.isPasswordLoading = false;
      },
      error: (error) => {
        alert(error.error?.message || 'Erreur lors du changement de mot de passe');
        this.isPasswordLoading = false;
      }
    });
  }

  loadTwoFactorStatus(): void {
    this.twoFactorService.getStatus().subscribe({
      next: (status) => {
        this.twoFactorStatus = status.enabled ? 'enabled' : 'disabled';
      },
      error: (error: any) => {
        console.error('Erreur lors du chargement du statut 2FA:', error);
        this.twoFactorStatus = 'disabled';
      }
    });
  }

  toggleTwoFactor(): void {
    this.isTwoFactorLoading = true;
    
    if (this.twoFactorStatus === 'disabled') {
      // Activer la 2FA
      this.enableTwoFactor();
    } else {
      // Désactiver la 2FA
      this.disableTwoFactor();
    }
  }

  enableTwoFactor(): void {
    this.twoFactorService.enable().subscribe({
      next: (response: any) => {
        this.qrCodeUrl = response.qrCode;
        this.showTwoFactorSetup = true;
        this.isTwoFactorLoading = false;
      },
      error: (error: any) => {
        console.error('Erreur lors de l\'activation de la 2FA:', error);
        alert('Erreur lors de l\'activation de la 2FA');
        this.isTwoFactorLoading = false;
      }
    });
  }

  disableTwoFactor(): void {
    if (confirm('Êtes-vous sûr de vouloir désactiver l\'authentification à deux facteurs ?')) {
      this.twoFactorService.disable().subscribe({
        next: () => {
          this.twoFactorStatus = 'disabled';
          this.qrCodeUrl = null;
          this.showTwoFactorSetup = false;
          this.verificationCode = '';
          this.isTwoFactorLoading = false;
          alert('Authentification à deux facteurs désactivée');
        },
        error: (error: any) => {
          console.error('Erreur lors de la désactivation de la 2FA:', error);
          alert('Erreur lors de la désactivation de la 2FA');
          this.isTwoFactorLoading = false;
        }
      });
    } else {
      this.isTwoFactorLoading = false;
    }
  }

  verifyTwoFactor(): void {
    if (this.verificationCode.length === 6) {
      this.twoFactorService.verify(this.verificationCode).subscribe({
        next: (response) => {
          if (response.success) {
            this.twoFactorStatus = 'enabled';
            this.showTwoFactorSetup = false;
            this.qrCodeUrl = null;
            this.verificationCode = '';
            this.isTwoFactorLoading = false;
            alert('Authentification à deux facteurs activée avec succès !');
          } else {
            alert('Code de vérification incorrect');
            this.isTwoFactorLoading = false;
          }
        },
        error: (error: any) => {
          console.error('Erreur lors de la vérification du code 2FA:', error);
          alert('Code de vérification incorrect');
          this.isTwoFactorLoading = false;
        }
      });
    }
  }

  editBuild(build: any): void {
    console.log('Edit build clicked:', build);
    // Implement build editing logic here
  }

  deleteBuild(build: any): void {
    console.log('Delete build clicked:', build);
    this.userBuilds = this.userBuilds.filter(b => b.id !== build.id);
    this.updateStats();
  }

  editEvent(event: any): void {
    console.log('Edit event clicked:', event);
    // Implement event editing logic here
  }

  deleteEvent(event: any): void {
    console.log('Delete event clicked:', event);
    this.userEvents = this.userEvents.filter(e => e.id !== event.id);
    this.updateStats();
  }

  private updateStats(): void {
    this.userStats.eventsCreated = this.userEvents.filter(e => e.status === 'upcoming').length;
    this.userStats.eventsParticipated = this.userEvents.filter(e => e.status === 'ongoing').length;
    this.userStats.buildsShared = this.userBuilds.length;
  }
} 