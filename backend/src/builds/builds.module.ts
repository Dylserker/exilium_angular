import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Build } from './build.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Build])],
  providers: [],
  exports: [],
})
export class BuildsModule {} 