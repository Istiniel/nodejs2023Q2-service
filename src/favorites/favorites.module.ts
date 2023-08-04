import { Global, Module } from '@nestjs/common';
import { AlbumsModule } from 'src/albums/albums.module';
import { ArtistsModule } from 'src/artists/artists.module';
import { ArtistsService } from 'src/artists/services/artists/artists.service';
import { TracksModule } from 'src/tracks/tracks.module';
import { FavoritesController } from './controllers/favorites/favorites.controller';
import { FavoritesService } from './services/favorites/favorites.service';

@Global()
@Module({
  imports: [TracksModule, ArtistsModule, AlbumsModule],
  controllers: [FavoritesController],
  providers: [FavoritesService, ArtistsService],
  exports: [FavoritesService]
})
export class FavoritesModule { }
