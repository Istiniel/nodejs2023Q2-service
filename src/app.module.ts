import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavoritesModule } from 'src/favorites/favorites.module';
import { FavoritesService } from 'src/favorites/services/favorites/favorites.service';
import { AlbumsModule } from './albums/albums.module';
import { ArtistsModule } from './artists/artists.module';
import { configuration } from './config/configuration';
import typeorm from './db/dataSource';
import { DatabaseModule } from './db/database.module';
import { DatabaseService } from './db/services/database/database.service';
import { TracksModule } from './tracks/tracks.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration, typeorm],
    }),
    UsersModule,
    ArtistsModule,
    TracksModule,
    AlbumsModule,
    DatabaseModule,
    FavoritesModule,
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => (configService.get('typeorm'))
    }),
  ],
  controllers: [],
  providers: [DatabaseService, FavoritesService],
})
export class AppModule { }
