import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: any) {
    // Vérifier si l'utilisateur existe déjà
    const existingUser = await this.usersService.findByEmail(registerDto.email);
    if (existingUser) {
      throw new UnauthorizedException('Un utilisateur avec cet email existe déjà');
    }

    // Créer le nouvel utilisateur
    const user = await this.usersService.create(registerDto);
    
    // Générer le token JWT
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      },
    };
  }

  async login(loginDto: any) {
    const user = await this.usersService.findByEmail(loginDto.email);
    if (!user) {
      throw new UnauthorizedException('Email ou mot de passe incorrect');
    }

    const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Email ou mot de passe incorrect');
    }

    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      },
    };
  }

  async updateProfile(userId: number, updateProfileDto: UpdateProfileDto) {
    // Vérifier si l'utilisateur existe
    const existingUser = await this.usersService.findById(userId);
    
    if (!existingUser) {
      throw new UnauthorizedException('Utilisateur non trouvé');
    }

    // Si l'email est modifié, vérifier qu'il n'existe pas déjà
    if (updateProfileDto.email && updateProfileDto.email !== existingUser.email) {
      const userWithEmail = await this.usersService.findByEmail(updateProfileDto.email);
      if (userWithEmail && userWithEmail.id !== userId) {
        throw new UnauthorizedException('Un utilisateur avec cet email existe déjà');
      }
    }

    const updatedUser = await this.usersService.update(userId, updateProfileDto);
    
    return {
      user: {
        id: updatedUser.id,
        email: updatedUser.email,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        role: updatedUser.role,
      },
    };
  }

  async changePassword(userId: number, dto: ChangePasswordDto) {
    const user = await this.usersService.findById(userId);
    if (!user) {
      throw new UnauthorizedException('Utilisateur non trouvé');
    }

    const isPasswordValid = await bcrypt.compare(dto.currentPassword, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Mot de passe actuel incorrect');
    }

    if (dto.newPassword !== dto.confirmPassword) {
      throw new BadRequestException('Les nouveaux mots de passe ne correspondent pas');
    }

    if (dto.newPassword.length < 6) {
      throw new BadRequestException('Le nouveau mot de passe doit contenir au moins 6 caractères');
    }

    const hashedPassword = await bcrypt.hash(dto.newPassword, 10);
    await this.usersService.update(userId, { password: hashedPassword });
    
    return { success: true };
  }

  async getUserById(userId: number) {
    return this.usersService.findById(userId);
  }
} 