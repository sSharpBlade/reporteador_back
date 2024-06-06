import { Module } from '@nestjs/common';
import { AuthModule } from './auth/infrastructure/Modules/auth.module';
import { UsersModule } from './users/infrastructure/modules/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServersModule } from './servers/servers.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    ServersModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'ep-delicate-wind-a52odiy4.us-east-2.aws.neon.tech',
      port: 5432,
      username: 'reporteador_owner',
      password: 's6trIamd8BQA',
      database: 'reporteador',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: false,
      ssl: {
        rejectUnauthorized: false, // Esto puede ser necesario si no tienes un certificado SSL válido
      },
    }),
    TypeOrmModule.forFeature([ServersModule]),
    
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
