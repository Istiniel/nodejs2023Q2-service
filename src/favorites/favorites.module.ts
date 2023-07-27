import { Module } from '@nestjs/common';
import { FavoritesController } from './controllers/favorites/favorites.controller';
import { FavoritesService } from './services/favorites/favorites.service';

@Module({
  controllers: [FavoritesController],
  providers: [FavoritesService]
})
export class FavoritesModule {}
