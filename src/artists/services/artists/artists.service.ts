import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ArtistEntity } from 'src/artists/entities/artist.entity';
import { Repository } from 'typeorm';
import { CreateArtistDto } from '../../dtos/CreateArtist.dto';
import { UpdateArtistDto } from '../../dtos/UpdateArtist.dto';

@Injectable()
export class ArtistsService {
  constructor(
    @InjectRepository(ArtistEntity) private artistRepository: Repository<ArtistEntity>) { }

  async getArtists() {
    return await this.artistRepository.find()
  }

  async createArtist(artistData: CreateArtistDto) {
    const newAlbum = this.artistRepository.create(artistData)
    return await this.artistRepository.save(newAlbum)
  }

  async getArtist(id: string) {
    const album = await this.artistRepository.findOne({ where: { id } })
    return album
  }

  async updateArtist(artistData: UpdateArtistDto, id: string) {
    const artist = await this.artistRepository.findOne({ where: { id } })

    const updatedArtist = await this.artistRepository.save({ ...artist, ...artistData })
    return updatedArtist
  }

  async deleteArtist(id: string) {
    await this.artistRepository.delete(id)
  }
}
