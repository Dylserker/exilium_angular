import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Added for ngModel

@Component({
  selector: 'app-builds',
  standalone: true,
  imports: [CommonModule, FormsModule], // Added FormsModule
  template: `
    <div class="builds-container">
      <div class="builds-header">
        <h1>Builds</h1>
        <p>Découvrez et partagez vos configurations gaming</p>
        <button class="btn btn-primary">Créer un build</button>
      </div>
      
      <div class="filters">
        <div class="filter-group">
          <label>Catégorie:</label>
          <select [(ngModel)]="selectedCategory" name="categoryFilter">
            <option value="">Toutes les catégories</option>
            <option value="warframe">Warframes</option>
            <option value="primary">Armes primaires</option>
            <option value="secondary">Armes secondaires</option>
            <option value="melee">Armes de mêlée</option>
            <option value="companion">Compagnons</option>
          </select>
        </div>
        
        <div class="filter-group">
          <label>Forma:</label>
          <select [(ngModel)]="selectedForma" name="formaFilter">
            <option value="">Tous</option>
            <option value="0">0 Forma</option>
            <option value="1">1 Forma</option>
            <option value="2">2 Forma</option>
            <option value="3">3 Forma</option>
            <option value="4">4 Forma</option>
            <option value="5">5+ Forma</option>
          </select>
        </div>
        
        <div class="filter-group">
          <label>Note minimum:</label>
          <select [(ngModel)]="selectedRating" name="ratingFilter">
            <option value="">Toutes les notes</option>
            <option value="4.5">4.5+ étoiles</option>
            <option value="4.0">4.0+ étoiles</option>
            <option value="3.5">3.5+ étoiles</option>
          </select>
        </div>
      </div>
      
      <div class="builds-grid">
        @for (build of filteredBuilds; track $index) {
        <div class="build-card">
          <div class="build-image">
            <div class="build-badge" [class]="build.category">{{ build.category }}</div>
            <div class="build-rating">
              <span class="stars">★★★★★</span>
              <span class="rating-value">{{ build.rating }}</span>
            </div>
          </div>
          <div class="build-content">
            <h3>{{ build.title }}</h3>
            <p class="build-description">{{ build.description }}</p>
            
            <div class="build-details">
              <div class="detail-item">
                <span class="detail-label">Type:</span>
                <span class="detail-value">{{ build.warframe || build.weapon }}</span>
              </div>
              <div class="detail-item">
                <span class="detail-label">Forma:</span>
                <span class="detail-value">{{ build.forma }}</span>
              </div>
              <div class="detail-item">
                <span class="detail-label">Mods principaux:</span>
                <span class="detail-value">{{ build.mods.slice(0, 3).join(', ') }}</span>
              </div>
            </div>
            
            <div class="build-footer">
              <span class="author">Par {{ build.author }}</span>
              <div class="build-actions">
                <button class="btn btn-primary">Voir détails</button>
                <button class="btn btn-secondary">Copier</button>
              </div>
            </div>
          </div>
        </div>
        }
      </div>
    </div>
  `,
  styles: [`
    .builds-container {
      min-height: 100vh;
      background: linear-gradient(135deg, #1a1a1a 0%, #2d1b1b 100%);
      color: white;
      padding: 20px;
    }

    .builds-header {
      text-align: center;
      margin-bottom: 40px;
    }

    .builds-header h1 {
      font-size: 3rem;
      margin-bottom: 10px;
      color: #ff4444;
      text-shadow: 0 0 20px rgba(255, 68, 68, 0.5);
    }

    .builds-header p {
      font-size: 1.2rem;
      color: #cccccc;
      margin-bottom: 20px;
    }

    .filters {
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

    .builds-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
      gap: 30px;
      max-width: 1400px;
      margin: 0 auto;
    }

    .build-card {
      background: rgba(255, 255, 255, 0.05);
      border-radius: 15px;
      overflow: hidden;
      border: 1px solid rgba(255, 68, 68, 0.2);
      transition: all 0.3s ease;
    }

    .build-card:hover {
      transform: translateY(-5px);
      border-color: #ff4444;
      box-shadow: 0 10px 30px rgba(255, 68, 68, 0.2);
    }

    .build-image {
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

    .build-badge {
      position: absolute;
      top: 15px;
      right: 15px;
      padding: 5px 12px;
      border-radius: 20px;
      font-size: 0.8rem;
      font-weight: 600;
      text-transform: uppercase;
    }

    .build-badge.gaming {
      background: #ff4444;
      color: white;
    }

    .build-badge.workstation {
      background: #4444ff;
      color: white;
    }

    .build-badge.budget {
      background: #44ff44;
      color: black;
    }

    .build-badge.premium {
      background: #ffaa00;
      color: black;
    }

    .build-content {
      padding: 25px;
    }

    .build-content h3 {
      color: #ff4444;
      margin-bottom: 10px;
      font-size: 1.4rem;
    }

    .build-description {
      color: #cccccc;
      margin-bottom: 20px;
      line-height: 1.5;
    }

    .build-specs {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
      margin-bottom: 20px;
      padding: 15px;
      background: rgba(255, 255, 255, 0.05);
      border-radius: 10px;
    }

    .spec-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .spec-label {
      color: #cccccc;
      font-weight: 600;
      font-size: 0.9rem;
    }

    .spec-value {
      color: white;
      font-size: 0.9rem;
    }

    .spec-value.price {
      color: #ff4444;
      font-weight: bold;
    }

    .build-meta {
      display: flex;
      gap: 20px;
      margin-bottom: 20px;
    }

    .meta-item {
      display: flex;
      align-items: center;
      gap: 5px;
      color: #cccccc;
      font-size: 0.9rem;
    }

    .icon {
      font-size: 1rem;
    }

    .build-actions {
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
      .builds-filters {
        flex-direction: column;
        align-items: stretch;
      }
      
      .search-input {
        min-width: auto;
      }
      
      .builds-grid {
        grid-template-columns: 1fr;
      }
      
      .build-specs {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class BuildsComponent {
  builds = [
    {
      id: 1,
      title: 'Saryn Prime - Spore Build',
      category: 'warframe',
      warframe: 'Saryn Prime',
      description: 'Build optimisé pour les missions de survie et défense avec focus sur les spores',
      mods: ['Spore', 'Molt', 'Toxic Lash', 'Miasma'],
      forma: 3,
      rating: 4.8,
      author: 'Exilium_Carnage',
      image: 'saryn-prime.jpg'
    },
    {
      id: 2,
      title: 'Rubico Prime - Eidolon Hunter',
      category: 'primary',
      weapon: 'Rubico Prime',
      description: 'Build spécialisé pour la chasse aux Eidolons',
      mods: ['Serration', 'Split Chamber', 'Vital Sense', 'Point Strike'],
      forma: 5,
      rating: 4.9,
      author: 'Tenno_Elite',
      image: 'rubico-prime.jpg'
    },
    {
      id: 3,
      title: 'Gram Prime - Heavy Blade',
      category: 'melee',
      weapon: 'Gram Prime',
      description: 'Build pour les missions de survie avec focus sur les dégâts',
      mods: ['Pressure Point', 'Berserker', 'Blood Rush', 'Weeping Wounds'],
      forma: 4,
      rating: 4.7,
      author: 'Warrior_Prime',
      image: 'gram-prime.jpg'
    },
    {
      id: 4,
      title: 'Mesa Prime - Peacemaker',
      category: 'warframe',
      warframe: 'Mesa Prime',
      description: 'Build pour les missions de défense et extermination',
      mods: ['Peacemaker', 'Shatter Shield', 'Shooting Gallery', 'Ballistic Battery'],
      forma: 2,
      rating: 4.6,
      author: 'Gunslinger_Tenno',
      image: 'mesa-prime.jpg'
    },
    {
      id: 5,
      title: 'Bramma - Explosive Bow',
      category: 'primary',
      weapon: 'Bramma',
      description: 'Build pour les missions de crowd control',
      mods: ['Serration', 'Split Chamber', 'Heavy Caliber', 'Vigilante Armaments'],
      forma: 3,
      rating: 4.5,
      author: 'Explosive_Expert',
      image: 'bramma.jpg'
    },
    {
      id: 6,
      title: 'Kronen Prime - Dual Blades',
      category: 'melee',
      weapon: 'Kronen Prime',
      description: 'Build pour les missions de survie avec focus sur la vitesse',
      mods: ['Pressure Point', 'Berserker', 'Blood Rush', 'Condition Overload'],
      forma: 4,
      rating: 4.8,
      author: 'Blade_Master',
      image: 'kronen-prime.jpg'
    }
  ];

  // New properties for filters
  selectedCategory: string = '';
  selectedForma: string = '';
  selectedRating: string = '';

  // New method to filter builds
  get filteredBuilds(): any[] {
    return this.builds.filter(build => {
      const matchesCategory = this.selectedCategory ? build.category === this.selectedCategory : true;
      const matchesForma = this.selectedForma ? build.forma === parseInt(this.selectedForma, 10) : true;
      const matchesRating = this.selectedRating ? build.rating >= parseFloat(this.selectedRating) : true;
      return matchesCategory && matchesForma && matchesRating;
    });
  }
} 