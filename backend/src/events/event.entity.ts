import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../users/user.entity';

@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('text')
  description: string;

  @Column()
  type: string; // 'raid', 'farming', 'social', 'tournament'

  @Column()
  date: Date;

  @Column()
  duration: number; // en minutes

  @Column()
  maxParticipants: number;

  @Column()
  currentParticipants: number;

  @Column()
  status: string; // 'upcoming', 'ongoing', 'completed', 'cancelled'

  @Column()
  organizerId: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'organizerId' })
  organizer: User;

  @Column({ nullable: true })
  rewards: string;

  @Column({ nullable: true })
  requirements: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
} 