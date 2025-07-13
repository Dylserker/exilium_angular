import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: any): Promise<any> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const user = this.usersRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });
    return await this.usersRepository.save(user);
  }

  async findByEmail(email: string): Promise<any> {
    return this.usersRepository.findOne({ where: { email } });
  }

  async findById(id: number): Promise<any> {
    return this.usersRepository.findOne({ where: { id } });
  }

  async update(id: number, updateUserDto: any): Promise<any> {
    await this.usersRepository.update(id, updateUserDto);
    return this.findById(id);
  }

  async findAll(): Promise<any[]> {
    return this.usersRepository.find();
  }
} 