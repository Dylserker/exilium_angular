import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  password: string;

  @Column({ default: 'member' })
  role: string; // 'admin', 'moderator', 'member'

  @Column({ nullable: true })
  warframeUsername: string;

  @Column({ nullable: true })
  clanRank: string;

  @Column({ default: false })
  isActive: boolean;

  @Column({ default: false })
  twoFactorEnabled: boolean;

  @Column({ nullable: true })
  twoFactorSecret: string;

  @Column({ nullable: true })
  twoFactorBackupCodes: string; // JSON string of backup codes

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
} 