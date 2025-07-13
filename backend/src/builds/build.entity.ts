import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../users/user.entity';

@Entity()
export class Build {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  category: string; // 'warframe', 'primary', 'secondary', 'melee', 'companion'

  @Column({ nullable: true })
  warframe: string;

  @Column({ nullable: true })
  weapon: string;

  @Column('text')
  description: string;

  @Column('simple-array')
  mods: string[];

  @Column()
  forma: number;

  @Column('decimal', { precision: 3, scale: 1 })
  rating: number;

  @Column()
  authorId: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'authorId' })
  author: User;

  @Column({ nullable: true })
  image: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
} 