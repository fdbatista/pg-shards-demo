import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Consumption } from './entities/consumption.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      name: 'shard1',
      type: 'postgres',
      host: 'pg-shard-1',
      port: 5432,
      username: 'db',
      password: 'db',
      database: 'db',
      entities: [Consumption],
    }),
    TypeOrmModule.forRoot({
      name: 'shard2',
      type: 'postgres',
      host: 'pg-shard-2',
      port: 5432,
      username: 'db',
      password: 'db',
      database: 'db',
      entities: [Consumption],
    }),
    TypeOrmModule.forRoot({
      name: 'shard3',
      type: 'postgres',
      host: 'pg-shard-3',
      port: 5432,
      username: 'db',
      password: 'db',
      database: 'db',
      entities: [Consumption],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
