import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AlbumsModule } from './albums/albums.module';
import { ArtistsModule } from './artists/artists.module';
import { configuration } from './config/configuration';
import { DatabaseModule } from './db/database.module';
import { DatabaseService } from './db/services/database/database.service';
import { FavoritesModule } from './favorites/favorites.module';
import { TracksModule } from './tracks/tracks.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    load: [configuration],
  }), UsersModule, ArtistsModule, TracksModule, AlbumsModule, FavoritesModule, DatabaseModule],
  controllers: [],
  providers: [DatabaseService],
})
export class AppModule { }
