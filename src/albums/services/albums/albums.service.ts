import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/db/services/database/database.service';
import { v4 as uuidv4 } from 'uuid';
import { CreateAlbumDto } from '../../dtos/CreateAlbum.dto';
import { UpdateAlbumDto } from '../../dtos/UpdateAlbum.dto';

@Injectable()
export class AlbumsService {

  constructor(private dbService: DatabaseService) { }

  getAlbums() {
    return this.dbService.getAlbums()
  }

  createAlbum(albumData: CreateAlbumDto) {
    const id = uuidv4();
    const album = { ...albumData, id };
    this.dbService.createAlbum({ ...album })
    return album;
  }

  getAlbum(id: string) {
    return this.dbService.getAlbum(id)
  }

  updateAlbum(albumData: UpdateAlbumDto, id: string) {
    const album = this.dbService.updateAlbum(albumData, id)
    return album
  }

  deleteAlbum(id: string) {
    this.dbService.deleteAlbum(id)
  }
}
