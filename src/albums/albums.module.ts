import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumEntity } from 'src/albums/entities/album.entity';
import { AlbumsController } from './controllers/albums/albums.controller';
import { AlbumsService } from './services/albums/albums.service';

@Module({
  imports: [TypeOrmModule.forFeature([AlbumEntity])],
  controllers: [AlbumsController],
  providers: [AlbumsService]
})
export class AlbumsModule { }
