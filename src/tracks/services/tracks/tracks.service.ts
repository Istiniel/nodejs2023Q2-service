import { Injectable } from '@nestjs/common';
import { Track } from '../../../types';
import { v4 as uuidv4 } from 'uuid';
import { CreateTrackDto } from '../../dtos/CreateTrack.dto';

@Injectable()
export class TracksService {
  private fakeTracks: Track[] = []

  getTracks() {
    return this.fakeTracks
  }

  createTrack(trackData: CreateTrackDto) {
    const id = uuidv4();
    const track = { ...trackData, id }
    this.fakeTracks.push(track)
    return track;
  }

  getTrack(id: string) {
    return this.fakeTracks.filter(user => user.id === id)[0]
  }

  updateTrack(trackData: CreateTrackDto, id: string) {
    const user = this.fakeTracks.filter(track => track.id === id)[0]
    return { ...user, ...trackData }
  }

  deleteTrack(id: string) {
    this.fakeTracks = this.fakeTracks.filter(track => track.id !== id)
  }
}
