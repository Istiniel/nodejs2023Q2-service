import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavoriteAlbumEntity } from 'src/favorites/entities/favoriteAlbum.entity';
import { FavoriteArtistEntity } from 'src/favorites/entities/favoriteArtist.entity';
import { FavoriteTrackEntity } from 'src/favorites/entities/favoriteTrack.entity';
import { FavoritesController } from './controllers/favorites/favorites.controller';
import { FavoritesService } from './services/favorites/favorites.service';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([FavoriteArtistEntity]),
  TypeOrmModule.forFeature([FavoriteAlbumEntity]),
  TypeOrmModule.forFeature([FavoriteTrackEntity])],
  controllers: [FavoritesController],
  providers: [FavoritesService]
})
export class FavoritesModule { }
