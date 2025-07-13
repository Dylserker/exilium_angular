import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { BuildsModule } from './builds/builds.module';
import { EventsModule } from './events/events.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'exilium.db',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // En développement seulement
    }),
    AuthModule,
    UsersModule,
    BuildsModule,
    EventsModule,
  ],
})
export class AppModule {}
