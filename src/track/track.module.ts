import { Module } from '@nestjs/common';
import { TrackController } from './controllers/track/track.controller';
import { TrackService } from './controllers/track/track.service';

@Module({
  controllers: [TrackController],
  providers: [TrackService]
})
export class TrackModule {}
