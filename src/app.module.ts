import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'
import { configuration } from './config/configuration'
import { FavoritesModule } from './favorites/favorites.module';
import { ArtistsModule } from './artists/artists.module';
import { TracksModule } from './tracks/tracks.module';
import { UsersModule } from './users/users.module';
import { AlbumsModule } from './albums/albums.module';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    load: [configuration],
  }), UsersModule, ArtistsModule, TracksModule, AlbumsModule, FavoritesModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
