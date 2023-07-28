import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/db/services/database/database.service';
import { v4 as uuidv4 } from 'uuid';
import { CreateArtistDto } from '../../dtos/CreateArtist.dto';
import { UpdateArtistDto } from '../../dtos/UpdateArtist.dto';

@Injectable()
export class ArtistsService {
  constructor(private dbService: DatabaseService) { }

  getArtists() {
    return this.dbService.getArtists()
  }

  createArtist(artistData: CreateArtistDto) {
    const id = uuidv4();
    const artist = { ...artistData, id };
    this.dbService.createArtist({ ...artist })
    return artist;
  }

  getArtist(id: string) {
    return this.dbService.getArtist(id)
  }

  updateArtist(artistData: UpdateArtistDto, id: string) {
    const artist = this.dbService.updateArtist(artistData, id)
    return artist
  }

  deleteArtist(id: string) {
    this.dbService.deleteArtist(id)
  }
}
