import { FileModule } from './files/file.module';
import { Module } from '@nestjs/common';
import { AuthModule } from './auth/infrastructure/Modules/auth.module';
import { UsersModule } from './users/infrastructure/modules/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServersModule } from './database/database.module';

import { ConfigModule } from '@nestjs/config';
import { SqlModule } from './sql/sql.module';
import { TemplateModule } from './template/template.module';
import { DatabaseConnection } from './database/database.entity';

@Module({
  imports: [
    FileModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    UsersModule,
    SqlModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USERNAME,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      autoLoadEntities: true,
      synchronize: true,
      ssl: process.env.POSTGRES_SSL === 'true',
      extra: {
        ssl:
          process.env.POSTGRES_SSL === 'true'
            ? { rejectUnauthorized: false }
            : null,
      },
    }),
    TemplateModule,
    ServersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
