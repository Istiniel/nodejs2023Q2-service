import { Module } from '@nestjs/common';
import { AlbumController } from './controllers/album/album.controller';
import { AlbumService } from './services/album/album.service';

@Module({
  controllers: [AlbumController],
  providers: [AlbumService]
})
export class AlbumModule {}
