import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface AdminStats {
  totalUsers: number;
  totalBuilds: number;
  totalEvents: number;
  newUsersThisMonth: number;
}

export interface AdminUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  isActive: boolean;
  createdAt: string;
}

export interface ReportedContent {
  id: number;
  title: string;
  description: string;
  reportReason: string;
  reportedAt: string;
}

export interface SystemLog {
  id: number;
  level: string;
  message: string;
  timestamp: string;
}

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = 'http://localhost:3000/admin';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('auth_token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  // Statistiques
  getStats(): Observable<AdminStats> {
    return this.http.get<AdminStats>(`${this.apiUrl}/stats`, { headers: this.getHeaders() });
  }

  // Gestion des utilisateurs
  getUsers(): Observable<AdminUser[]> {
    return this.http.get<AdminUser[]>(`${this.apiUrl}/users`, { headers: this.getHeaders() });
  }

  updateUserRole(userId: number, newRole: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/users/${userId}/role`, 
      { role: newRole }, 
      { headers: this.getHeaders() }
    );
  }

  toggleUserStatus(userId: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/users/${userId}/status`, 
      {}, 
      { headers: this.getHeaders() }
    );
  }

  deleteUser(userId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/users/${userId}`, { headers: this.getHeaders() });
  }

  // Modération des contenus
  getReportedBuilds(): Observable<ReportedContent[]> {
    return this.http.get<ReportedContent[]>(`${this.apiUrl}/reports/builds`, { headers: this.getHeaders() });
  }

  getReportedEvents(): Observable<ReportedContent[]> {
    return this.http.get<ReportedContent[]>(`${this.apiUrl}/reports/events`, { headers: this.getHeaders() });
  }

  approveContent(contentId: number, type: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/moderation/${type}/${contentId}/approve`, 
      {}, 
      { headers: this.getHeaders() }
    );
  }

  rejectContent(contentId: number, type: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/moderation/${type}/${contentId}/reject`, 
      {}, 
      { headers: this.getHeaders() }
    );
  }

  // Logs système
  getSystemLogs(): Observable<SystemLog[]> {
    return this.http.get<SystemLog[]>(`${this.apiUrl}/logs`, { headers: this.getHeaders() });
  }
} 