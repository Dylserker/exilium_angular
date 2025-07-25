# Exilium Angular - Projet Full Stack

Ce projet est une application web moderne construite avec Angular (frontend) et NestJS (backend).

## 🚀 Fonctionnalités

- **Page d'accueil** : Interface moderne avec présentation des fonctionnalités
- **Authentification** : Système de connexion et d'inscription
- **API REST** : Backend NestJS avec endpoints d'authentification
- **Design responsive** : Interface adaptée à tous les écrans

## 📁 Structure du projet

```
exilium_angular/
├── frontend/          # Application Angular
│   ├── src/app/
│   │   ├── home/      # Page d'accueil
│   │   ├── login/     # Page de connexion
│   │   ├── register/  # Page d'inscription
│   │   └── services/  # Services Angular
│   └── ...
├── backend/           # API NestJS
│   ├── src/
│   │   ├── auth/      # Module d'authentification
│   │   └── ...
│   └── ...
└── README.md
```

## 🛠️ Installation et démarrage

### Prérequis

- Node.js (version 18 ou supérieure)
- npm ou yarn

### Backend (NestJS)

1. Naviguez vers le dossier backend :
```bash
cd backend
```

2. Installez les dépendances :
```bash
npm install
```

3. Démarrez le serveur de développement :
```bash
npm run start:dev
```

Le backend sera accessible sur `http://localhost:3000`

### Frontend (Angular)

1. Ouvrez un nouveau terminal et naviguez vers le dossier frontend :
```bash
cd frontend
```

2. Installez les dépendances :
```bash
npm install
```

3. Démarrez le serveur de développement :
```bash
ng serve
```

Le frontend sera accessible sur `http://localhost:4200`

## 🔧 Configuration

### Backend

- **Port** : 3000 (configurable via variable d'environnement PORT)
- **CORS** : Configuré pour accepter les requêtes depuis `http://localhost:4200`
- **Validation** : Validation automatique des DTOs avec class-validator

### Frontend

- **Port** : 4200
- **API URL** : `http://localhost:3000/auth` (configurable dans `auth.service.ts`)

## 📡 API Endpoints

### Authentification

- `POST /auth/login` - Connexion utilisateur
- `POST /auth/register` - Inscription utilisateur

### Exemples d'utilisation

#### Connexion
```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password123"}'
```

#### Inscription
```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"firstName":"John","lastName":"Doe","email":"john@example.com","password":"password123"}'
```

## 🎨 Interface utilisateur

### Pages disponibles

1. **Page d'accueil** (`/`) : Présentation du projet avec navigation vers connexion/inscription
2. **Page de connexion** (`/login`) : Formulaire de connexion avec validation
3. **Page d'inscription** (`/register`) : Formulaire d'inscription avec validation

### Design

- Interface moderne avec dégradés et animations
- Design responsive pour mobile et desktop
- Formulaires avec validation en temps réel
- Messages d'erreur et de succès

## 🔒 Sécurité

### Backend

- Validation des données avec class-validator
- Gestion des erreurs avec messages appropriés
- Simulation de tokens JWT (à implémenter avec une vraie bibliothèque en production)

### Frontend

- Validation côté client
- Stockage sécurisé des tokens dans localStorage
- Gestion des erreurs d'API

## 🚀 Déploiement

### Backend

```bash
cd backend
npm run build
npm run start:prod
```

### Frontend

```bash
cd frontend
ng build --configuration production
```

## 📝 Prochaines étapes

- [ ] Implémentation d'une vraie base de données (PostgreSQL, MongoDB)
- [ ] Authentification JWT complète
- [ ] Gestion des rôles utilisateur
- [ ] Validation côté serveur renforcée
- [ ] Tests unitaires et d'intégration
- [ ] Documentation API avec Swagger
- [ ] Interface d'administration
- [ ] Notifications en temps réel

## 🤝 Contribution

1. Fork le projet
2. Créez une branche pour votre fonctionnalité
3. Committez vos changements
4. Poussez vers la branche
5. Ouvrez une Pull Request

## 📄 Licence

Ce projet est sous licence MIT.

## 🆘 Support

Pour toute question ou problème, veuillez ouvrir une issue sur le repository.
