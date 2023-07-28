import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/db/services/database/database.service';
import { FavoritesService } from 'src/favorites/services/favorites/favorites.service';
import { CreateTrackDto } from 'src/tracks/dtos/CreateTrack.dto';
import { UpdateTrackDto } from 'src/tracks/dtos/UpdateTrack.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TracksService {
  constructor(
    private dbService: DatabaseService,
    private favoritesService: FavoritesService) { }

  getTracks() {
    return this.dbService.getTracks()
  }

  createTrack(trackData: CreateTrackDto) {
    const id = uuidv4();
    const track = { ...trackData, id };
    this.dbService.createTrack({ ...track })
    return track;
  }

  getTrack(id: string) {
    return this.dbService.getTrack(id)
  }

  updateTrack(trackData: UpdateTrackDto, id: string) {
    const track = this.dbService.updateTrack(trackData, id)
    return track
  }

  deleteTrack(id: string) {
    this.dbService.deleteTrack(id)
    this.favoritesService.deleteTrack(id)
  }
}
