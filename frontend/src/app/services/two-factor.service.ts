import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface TwoFactorStatus {
  enabled: boolean;
  backupCodes: string[];
}

export interface TwoFactorSetup {
  secret: string;
  qrCode: string;
  backupCodes: string[];
}

@Injectable({
  providedIn: 'root'
})
export class TwoFactorService {
  private apiUrl = 'http://localhost:3000/auth/2fa';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('auth_token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  getStatus(): Observable<TwoFactorStatus> {
    return this.http.get<TwoFactorStatus>(`${this.apiUrl}/status`, { headers: this.getHeaders() });
  }

  enable(): Observable<TwoFactorSetup> {
    return this.http.post<TwoFactorSetup>(`${this.apiUrl}/enable`, {}, { headers: this.getHeaders() });
  }

  verify(code: string): Observable<{ success: boolean }> {
    return this.http.post<{ success: boolean }>(`${this.apiUrl}/verify`, { code }, { headers: this.getHeaders() });
  }

  disable(): Observable<{ success: boolean }> {
    return this.http.post<{ success: boolean }>(`${this.apiUrl}/disable`, {}, { headers: this.getHeaders() });
  }
} 