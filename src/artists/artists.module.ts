import { Module } from '@nestjs/common';
import { ArtistsController } from './controllers/artists/artists.controller';
import { ArtistsService } from './services/artists/artists.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArtistEntity } from 'src/artists/entities/artist.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ArtistEntity])],
  controllers: [ArtistsController],
  providers: [ArtistsService]
})
export class ArtistsModule { }
