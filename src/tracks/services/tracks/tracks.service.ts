import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/db/services/database/database.service';
import { v4 as uuidv4 } from 'uuid';
import { Track } from '../../../types';
import { CreateTrackDto } from '../../dtos/CreateTrack.dto';

@Injectable()
export class TracksService {
  private fakeTracks: Track[] = []

  constructor(private dbService: DatabaseService) { }

  getTracks() {
    return this.dbService.getTracks()
  }

  createTrack(trackData: CreateTrackDto) {
    const id = uuidv4();
    return this.dbService.createTrack({ ...trackData, id });
  }

  getTrack(id: string) {
    return this.dbService.getTrack(id)
  }

  updateTrack(trackData: CreateTrackDto, id: string) {
    const user = this.fakeTracks.filter(track => track.id === id)[0]
    return { ...user, ...trackData }
  }

  deleteTrack(id: string) {
    this.fakeTracks = this.fakeTracks.filter(track => track.id !== id)
  }
}
