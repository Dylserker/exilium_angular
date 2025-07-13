import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  template: `
    <div class="admin-container">
      <div class="admin-header">
        <h1>Dashboard Administrateur</h1>
        <p>Gestion complète de la plateforme Exilium</p>
      </div>
      
      <div class="admin-content">
        <!-- Statistiques générales -->
        <div class="stats-grid">
          <div class="stat-card">
            <div class="stat-icon">👥</div>
            <div class="stat-info">
              <h3>{{ stats.totalUsers }}</h3>
              <p>Utilisateurs totaux</p>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">🎮</div>
            <div class="stat-info">
              <h3>{{ stats.totalBuilds }}</h3>
              <p>Builds partagés</p>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">📅</div>
            <div class="stat-info">
              <h3>{{ stats.totalEvents }}</h3>
              <p>Événements créés</p>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">🆕</div>
            <div class="stat-info">
              <h3>{{ stats.newUsersThisMonth }}</h3>
              <p>Nouveaux ce mois</p>
            </div>
          </div>
        </div>

        <!-- Gestion des utilisateurs -->
        <div class="admin-section">
          <div class="section-header">
            <h2>Gestion des Utilisateurs</h2>
            <div class="search-bar">
              <input 
                type="text" 
                placeholder="Rechercher un utilisateur..." 
                [(ngModel)]="searchTerm"
                (input)="filterUsers()"
              >
            </div>
          </div>
          
          <div class="users-table">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nom</th>
                  <th>Email</th>
                  <th>Rôle</th>
                  <th>Date d'inscription</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let user of filteredUsers">
                  <td>{{ user.id }}</td>
                  <td>{{ user.firstName }} {{ user.lastName }}</td>
                  <td>{{ user.email }}</td>
                  <td>
                    <select 
                      [value]="user.role" 
                      (change)="updateUserRole(user.id, $event.target.value)"
                      [disabled]="user.role === 'admin'"
                    >
                      <option value="user">Utilisateur</option>
                      <option value="moderator">Modérateur</option>
                      <option value="admin">Administrateur</option>
                    </select>
                  </td>
                  <td>{{ user.createdAt | date:'dd/MM/yyyy' }}</td>
                  <td>
                    <div class="action-buttons">
                      <button 
                        class="btn btn-warning" 
                        (click)="toggleUserStatus(user)"
                        [disabled]="user.role === 'admin'"
                      >
                        {{ user.isActive ? 'Suspendre' : 'Réactiver' }}
                      </button>
                      <button 
                        class="btn btn-danger" 
                        (click)="deleteUser(user.id)"
                        [disabled]="user.role === 'admin'"
                      >
                        Supprimer
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Modération des contenus -->
        <div class="admin-section">
          <h2>Modération des Contenus</h2>
          <div class="moderation-tabs">
            <button 
              class="tab-btn" 
              [class.active]="activeTab === 'builds'"
              (click)="setActiveTab('builds')"
            >
              Builds signalés ({{ reportedBuilds.length }})
            </button>
            <button 
              class="tab-btn" 
              [class.active]="activeTab === 'events'"
              (click)="setActiveTab('events')"
            >
              Événements signalés ({{ reportedEvents.length }})
            </button>
          </div>
          
          <div class="moderation-content" *ngIf="activeTab === 'builds'">
            <div class="reported-item" *ngFor="let build of reportedBuilds">
              <div class="item-info">
                <h4>{{ build.title }}</h4>
                <p>{{ build.description }}</p>
                <span class="report-reason">Raison: {{ build.reportReason }}</span>
              </div>
              <div class="moderation-actions">
                <button class="btn btn-success" (click)="approveContent(build.id, 'build')">
                  Approuver
                </button>
                <button class="btn btn-danger" (click)="rejectContent(build.id, 'build')">
                  Rejeter
                </button>
              </div>
            </div>
          </div>
          
          <div class="moderation-content" *ngIf="activeTab === 'events'">
            <div class="reported-item" *ngFor="let event of reportedEvents">
              <div class="item-info">
                <h4>{{ event.title }}</h4>
                <p>{{ event.description }}</p>
                <span class="report-reason">Raison: {{ event.reportReason }}</span>
              </div>
              <div class="moderation-actions">
                <button class="btn btn-success" (click)="approveContent(event.id, 'event')">
                  Approuver
                </button>
                <button class="btn btn-danger" (click)="rejectContent(event.id, 'event')">
                  Rejeter
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Logs système -->
        <div class="admin-section">
          <h2>Logs Système</h2>
          <div class="logs-container">
            <div class="log-entry" *ngFor="let log of systemLogs">
              <span class="log-time">{{ log.timestamp | date:'HH:mm:ss' }}</span>
              <span class="log-level" [class]="log.level">{{ log.level }}</span>
              <span class="log-message">{{ log.message }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .admin-container {
      min-height: 100vh;
      background: linear-gradient(135deg, #1a1a1a 0%, #2d1b1b 100%);
      color: white;
      padding: 20px;
    }

    .admin-header {
      text-align: center;
      margin-bottom: 40px;
    }

    .admin-header h1 {
      font-size: 3rem;
      margin-bottom: 10px;
      color: #ff4444;
      text-shadow: 0 0 20px rgba(255, 68, 68, 0.5);
    }

    .admin-header p {
      font-size: 1.2rem;
      color: #cccccc;
    }

    .admin-content {
      max-width: 1400px;
      margin: 0 auto;
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 20px;
      margin-bottom: 40px;
    }

    .stat-card {
      background: rgba(255, 255, 255, 0.05);
      border-radius: 15px;
      padding: 25px;
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 68, 68, 0.2);
      display: flex;
      align-items: center;
      gap: 20px;
    }

    .stat-icon {
      font-size: 2.5rem;
      color: #ff4444;
    }

    .stat-info h3 {
      font-size: 2rem;
      margin: 0;
      color: #ff4444;
    }

    .stat-info p {
      margin: 5px 0 0 0;
      color: #cccccc;
    }

    .admin-section {
      background: rgba(255, 255, 255, 0.05);
      border-radius: 15px;
      padding: 30px;
      margin-bottom: 30px;
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 68, 68, 0.2);
    }

    .section-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 25px;
    }

    .section-header h2 {
      color: #ff4444;
      margin: 0;
    }

    .search-bar input {
      background: rgba(255, 255, 255, 0.1);
      border: 1px solid rgba(255, 68, 68, 0.3);
      border-radius: 8px;
      padding: 10px 15px;
      color: white;
      width: 300px;
    }

    .search-bar input::placeholder {
      color: #cccccc;
    }

    .users-table {
      overflow-x: auto;
    }

    table {
      width: 100%;
      border-collapse: collapse;
    }

    th, td {
      padding: 12px;
      text-align: left;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }

    th {
      background: rgba(255, 68, 68, 0.1);
      color: #ff4444;
      font-weight: bold;
    }

    select {
      background: rgba(255, 255, 255, 0.1);
      border: 1px solid rgba(255, 68, 68, 0.3);
      border-radius: 5px;
      padding: 5px 10px;
      color: white;
    }

    .action-buttons {
      display: flex;
      gap: 10px;
    }

    .btn {
      padding: 8px 15px;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      font-size: 0.9rem;
      transition: all 0.3s ease;
    }

    .btn-primary {
      background: #ff4444;
      color: white;
    }

    .btn-secondary {
      background: #666666;
      color: white;
    }

    .btn-warning {
      background: #ff8800;
      color: white;
    }

    .btn-danger {
      background: #cc0000;
      color: white;
    }

    .btn-success {
      background: #00cc00;
      color: white;
    }

    .btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    }

    .btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
      transform: none;
    }

    .moderation-tabs {
      display: flex;
      gap: 10px;
      margin-bottom: 20px;
    }

    .tab-btn {
      background: rgba(255, 255, 255, 0.1);
      border: 1px solid rgba(255, 68, 68, 0.3);
      border-radius: 8px;
      padding: 10px 20px;
      color: white;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .tab-btn.active {
      background: #ff4444;
      border-color: #ff4444;
    }

    .reported-item {
      background: rgba(255, 255, 255, 0.05);
      border-radius: 10px;
      padding: 20px;
      margin-bottom: 15px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .item-info h4 {
      color: #ff4444;
      margin: 0 0 10px 0;
    }

    .report-reason {
      color: #ff8800;
      font-size: 0.9rem;
    }

    .moderation-actions {
      display: flex;
      gap: 10px;
    }

    .logs-container {
      max-height: 300px;
      overflow-y: auto;
      background: rgba(0, 0, 0, 0.3);
      border-radius: 8px;
      padding: 15px;
    }

    .log-entry {
      display: flex;
      gap: 15px;
      margin-bottom: 8px;
      font-family: 'Courier New', monospace;
      font-size: 0.9rem;
    }

    .log-time {
      color: #888888;
      min-width: 80px;
    }

    .log-level {
      min-width: 60px;
      text-align: center;
      border-radius: 3px;
      padding: 2px 6px;
      font-size: 0.8rem;
    }

    .log-level.error {
      background: #cc0000;
      color: white;
    }

    .log-level.warning {
      background: #ff8800;
      color: white;
    }

    .log-level.info {
      background: #0088cc;
      color: white;
    }

    .log-message {
      color: #cccccc;
    }
  `]
})
export class AdminComponent implements OnInit {
  stats: any = {
    totalUsers: 0,
    totalBuilds: 0,
    totalEvents: 0,
    newUsersThisMonth: 0
  };

  users: any[] = [];
  filteredUsers: any[] = [];
  searchTerm: string = '';

  activeTab: string = 'builds';
  reportedBuilds: any[] = [];
  reportedEvents: any[] = [];
  systemLogs: any[] = [];

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.loadAdminData();
  }

  loadAdminData(): void {
    this.loadStats();
    this.loadUsers();
    this.loadReportedContent();
    this.loadSystemLogs();
  }

  loadStats(): void {
    this.adminService.getStats().subscribe({
      next: (stats) => {
        this.stats = stats;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des statistiques:', error);
      }
    });
  }

  loadUsers(): void {
    this.adminService.getUsers().subscribe({
      next: (users) => {
        this.users = users;
        this.filteredUsers = users;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des utilisateurs:', error);
      }
    });
  }

  loadReportedContent(): void {
    this.adminService.getReportedBuilds().subscribe({
      next: (builds) => {
        this.reportedBuilds = builds;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des builds signalés:', error);
      }
    });

    this.adminService.getReportedEvents().subscribe({
      next: (events) => {
        this.reportedEvents = events;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des événements signalés:', error);
      }
    });
  }

  loadSystemLogs(): void {
    this.adminService.getSystemLogs().subscribe({
      next: (logs) => {
        this.systemLogs = logs;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des logs:', error);
      }
    });
  }

  filterUsers(): void {
    if (!this.searchTerm.trim()) {
      this.filteredUsers = this.users;
    } else {
      this.filteredUsers = this.users.filter(user =>
        user.firstName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        user.lastName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }

  updateUserRole(userId: number, newRole: string): void {
    this.adminService.updateUserRole(userId, newRole).subscribe({
      next: () => {
        this.loadUsers();
      },
      error: (error) => {
        console.error('Erreur lors de la mise à jour du rôle:', error);
      }
    });
  }

  toggleUserStatus(user: any): void {
    this.adminService.toggleUserStatus(user.id).subscribe({
      next: () => {
        this.loadUsers();
      },
      error: (error) => {
        console.error('Erreur lors de la modification du statut:', error);
      }
    });
  }

  deleteUser(userId: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
      this.adminService.deleteUser(userId).subscribe({
        next: () => {
          this.loadUsers();
        },
        error: (error) => {
          console.error('Erreur lors de la suppression:', error);
        }
      });
    }
  }

  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }

  approveContent(contentId: number, type: string): void {
    this.adminService.approveContent(contentId, type).subscribe({
      next: () => {
        this.loadReportedContent();
      },
      error: (error) => {
        console.error('Erreur lors de l\'approbation:', error);
      }
    });
  }

  rejectContent(contentId: number, type: string): void {
    this.adminService.rejectContent(contentId, type).subscribe({
      next: () => {
        this.loadReportedContent();
      },
      error: (error) => {
        console.error('Erreur lors du rejet:', error);
      }
    });
  }
} 