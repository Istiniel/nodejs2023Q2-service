import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrackEntity } from 'src/tracks/entities/track.entity';
import { TracksController } from './controllers/tracks/tracks.controller';
import { TracksService } from './services/tracks/tracks.service';

@Module({
  imports: [TypeOrmModule.forFeature([TrackEntity])],
  controllers: [TracksController],
  providers: [TracksService]
})
export class TracksModule { }
