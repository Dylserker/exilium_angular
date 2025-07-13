import { Injectable } from '@nestjs/common';
import { authenticator } from 'otplib';
import * as qrcode from 'qrcode';
import { UsersService } from '../users/users.service';

@Injectable()
export class TwoFactorService {
  constructor(private usersService: UsersService) {}

  async generateTwoFactorSecret(userId: number, email: string) {
    const secret = authenticator.generateSecret();
    const otpauth = authenticator.keyuri(email, 'Exilium', secret);
    
    // Générer le QR code
    const qrCodeDataUrl = await qrcode.toDataURL(otpauth);
    
    // Sauvegarder le secret temporairement (en production, utilisez un cache Redis)
    await this.usersService.update(userId, { 
      twoFactorSecret: secret,
      twoFactorEnabled: false 
    });

    return {
      secret,
      qrCode: qrCodeDataUrl,
      backupCodes: this.generateBackupCodes()
    };
  }

  async verifyTwoFactorCode(userId: number, code: string): Promise<boolean> {
    const user = await this.usersService.findById(userId);
    if (!user || !user.twoFactorSecret) {
      return false;
    }

    const isValid = authenticator.verify({
      token: code,
      secret: user.twoFactorSecret
    });

    if (isValid) {
      // Activer la 2FA et sauvegarder les codes de sauvegarde
      await this.usersService.update(userId, { 
        twoFactorEnabled: true,
        twoFactorBackupCodes: JSON.stringify(this.generateBackupCodes())
      });
    }

    return isValid;
  }

  async disableTwoFactor(userId: number): Promise<void> {
    await this.usersService.update(userId, {
      twoFactorEnabled: false,
      twoFactorSecret: null,
      twoFactorBackupCodes: null
    });
  }

  async verifyTwoFactorLogin(userId: number, code: string): Promise<boolean> {
    const user = await this.usersService.findById(userId);
    if (!user || !user.twoFactorEnabled || !user.twoFactorSecret) {
      return false;
    }

    return authenticator.verify({
      token: code,
      secret: user.twoFactorSecret
    });
  }

  private generateBackupCodes(): string[] {
    const codes: string[] = [];
    for (let i = 0; i < 10; i++) {
      codes.push(Math.random().toString(36).substring(2, 8).toUpperCase());
    }
    return codes;
  }

  async getTwoFactorStatus(userId: number) {
    const user = await this.usersService.findById(userId);
    return {
      enabled: user?.twoFactorEnabled || false,
      backupCodes: user?.twoFactorBackupCodes ? JSON.parse(user.twoFactorBackupCodes) : []
    };
  }
} 