import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTrackDto } from 'src/tracks/dtos/CreateTrack.dto';
import { UpdateTrackDto } from 'src/tracks/dtos/UpdateTrack.dto';
import { TrackEntity } from 'src/tracks/entities/track.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TracksService {
  constructor(
    @InjectRepository(TrackEntity) private trackRepository: Repository<TrackEntity>) { }

  async getTracks() {
    return await this.trackRepository.find()
  }

  async createTrack(trackData: CreateTrackDto) {
    const newTrack = this.trackRepository.create(trackData)

    return await this.trackRepository.save(newTrack)
  }


  async getTrack(id: string) {
    const track = await this.trackRepository.findOne({ where: { id } })
    return track
  }

  async updateTrack(trackData: UpdateTrackDto, id: string) {
    const track = this.trackRepository.find({ where: { id } })

    await this.trackRepository.save({ ...track, ...trackData })
    const updatedTrack = await this.trackRepository.findOne({ where: { id } })

    return updatedTrack
  }

  deleteTrack(id: string) {
    this.trackRepository.delete(id)
  }
}
