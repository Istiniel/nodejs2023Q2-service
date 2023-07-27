import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { Artist } from '../../../types';
import { CreateArtistDto } from '../../dtos/CreateArtist.dto';
import { UpdateArtistDto } from '../../dtos/UpdateArtist.dto';

@Injectable()
export class ArtistsService {
  private fakeArtists: Artist[] = []

  getArtists() {
    return this.fakeArtists
  }

  createArtist(artistData: CreateArtistDto) {
    const id = uuidv4();
    this.fakeArtists.push({ ...artistData, id })
    return this.fakeArtists.filter(artist => artist.id === id)[0];
  }

  getArtist(id: string) {
    return this.fakeArtists.filter(artist => artist.id === id)[0]
  }

  updateArtist(artistData: UpdateArtistDto, id: string) {
    const artist = this.fakeArtists.filter(artist => artist.id === id)[0]
    return { ...artist, ...artistData }
  }

  deleteArtist(id: string) {
    this.fakeArtists = this.fakeArtists.filter(artist => artist.id !== id)
  }
}
