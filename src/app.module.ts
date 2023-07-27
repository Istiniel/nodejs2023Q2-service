import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config'
import { configuration } from './config/configuration'
import { ArtistModule } from './artist/artist.module';
import { TrackModule } from './track/track.module';
import { AlbumModule } from './album/album.module';
import { FavoritesModule } from './favorites/favorites.module';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    load: [configuration],
  }), UserModule, ArtistModule, TrackModule, AlbumModule, FavoritesModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
