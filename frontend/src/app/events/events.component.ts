import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [],
  template: `
    <div class="events-container">
      <div class="events-header">
        <h1>Événements</h1>
        <p>Découvrez et participez aux événements de la communauté</p>
        <button class="btn btn-primary">Créer un événement</button>
      </div>
      
      <div class="events-filters">
        <div class="filter-group">
          <label>Filtrer par :</label>
          <select class="filter-select">
            <option value="all">Tous les événements</option>
            <option value="upcoming">À venir</option>
            <option value="ongoing">En cours</option>
            <option value="past">Passés</option>
          </select>
        </div>
        <div class="search-box">
          <input type="text" placeholder="Rechercher un événement..." class="search-input">
        </div>
      </div>
      
      <div class="events-grid">
        @for (event of events; track $index) {
        <div class="event-card">
          <div class="event-image">
            <div class="event-badge" [class]="event.status">{{ event.status }}</div>
            <div class="image-placeholder">🎮</div>
          </div>
          <div class="event-content">
            <h3>{{ event.title }}</h3>
            <p class="event-description">{{ event.description }}</p>
            <div class="event-meta">
              <div class="meta-item">
                <span class="icon">📅</span>
                <span>{{ event.date }}</span>
              </div>
              <div class="meta-item">
                <span class="icon">📍</span>
                <span>{{ event.location }}</span>
              </div>
              <div class="meta-item">
                <span class="icon">👥</span>
                <span>{{ event.participants }}/{{ event.maxParticipants }}</span>
              </div>
            </div>
            <div class="event-actions">
              <button class="btn btn-primary">Participer</button>
              <button class="btn btn-secondary">Détails</button>
            </div>
          </div>
        </div>
        }
      </div>
    </div>
  `,
  styles: [`
    .events-container {
      min-height: 100vh;
      background: linear-gradient(135deg, #1a1a1a 0%, #2d1b1b 100%);
      color: white;
      padding: 20px;
    }

    .events-header {
      text-align: center;
      margin-bottom: 40px;
    }

    .events-header h1 {
      font-size: 3rem;
      margin-bottom: 10px;
      color: #ff4444;
      text-shadow: 0 0 20px rgba(255, 68, 68, 0.5);
    }

    .events-header p {
      font-size: 1.2rem;
      color: #cccccc;
      margin-bottom: 20px;
    }

    .events-filters {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 30px;
      flex-wrap: wrap;
      gap: 20px;
    }

    .filter-group {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .filter-group label {
      color: #cccccc;
      font-weight: 600;
    }

    .filter-select, .search-input {
      padding: 10px 15px;
      background: rgba(255, 255, 255, 0.1);
      border: 1px solid rgba(255, 68, 68, 0.3);
      border-radius: 8px;
      color: white;
      font-size: 1rem;
    }

    .filter-select:focus, .search-input:focus {
      outline: none;
      border-color: #ff4444;
      box-shadow: 0 0 10px rgba(255, 68, 68, 0.3);
    }

    .search-input {
      min-width: 250px;
    }

    .events-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
      gap: 30px;
      max-width: 1400px;
      margin: 0 auto;
    }

    .event-card {
      background: rgba(255, 255, 255, 0.05);
      border-radius: 15px;
      overflow: hidden;
      border: 1px solid rgba(255, 68, 68, 0.2);
      transition: all 0.3s ease;
    }

    .event-card:hover {
      transform: translateY(-5px);
      border-color: #ff4444;
      box-shadow: 0 10px 30px rgba(255, 68, 68, 0.2);
    }

    .event-image {
      position: relative;
      height: 200px;
      background: linear-gradient(135deg, #ff4444, #cc0000);
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .image-placeholder {
      font-size: 4rem;
    }

    .event-badge {
      position: absolute;
      top: 15px;
      right: 15px;
      padding: 5px 12px;
      border-radius: 20px;
      font-size: 0.8rem;
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

    .event-badge.past {
      background: #666666;
      color: white;
    }

    .event-content {
      padding: 25px;
    }

    .event-content h3 {
      color: #ff4444;
      margin-bottom: 10px;
      font-size: 1.4rem;
    }

    .event-description {
      color: #cccccc;
      margin-bottom: 20px;
      line-height: 1.5;
    }

    .event-meta {
      display: flex;
      flex-direction: column;
      gap: 8px;
      margin-bottom: 20px;
    }

    .meta-item {
      display: flex;
      align-items: center;
      gap: 8px;
      color: #cccccc;
      font-size: 0.9rem;
    }

    .icon {
      font-size: 1rem;
    }

    .event-actions {
      display: flex;
      gap: 10px;
    }

    .btn {
      padding: 10px 20px;
      border: none;
      border-radius: 8px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      text-decoration: none;
      display: inline-block;
      font-size: 0.9rem;
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

    @media (max-width: 768px) {
      .events-filters {
        flex-direction: column;
        align-items: stretch;
      }
      
      .search-input {
        min-width: auto;
      }
      
      .events-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class EventsComponent {
  events = [
    {
      title: 'Tournoi Gaming 2024',
      description: 'Compétition de jeux vidéo avec de nombreux prix à gagner. Ouvert à tous les niveaux.',
      date: '15 Mars 2024',
      location: 'Paris, France',
      participants: 45,
      maxParticipants: 100,
      status: 'upcoming'
    },
    {
      title: 'LAN Party Weekend',
      description: 'Weekend de jeux en réseau local avec des tournois et des activités.',
      date: '22 Mars 2024',
      location: 'Lyon, France',
      participants: 80,
      maxParticipants: 80,
      status: 'ongoing'
    },
    {
      title: 'Esports Championship',
      description: 'Championnat d\'esports avec les meilleurs joueurs de la région.',
      date: '10 Mars 2024',
      location: 'Marseille, France',
      participants: 120,
      maxParticipants: 120,
      status: 'past'
    },
    {
      title: 'Gaming Convention',
      description: 'Convention gaming avec stands, démonstrations et rencontres.',
      date: '5 Avril 2024',
      location: 'Toulouse, France',
      participants: 25,
      maxParticipants: 200,
      status: 'upcoming'
    }
  ];
} 