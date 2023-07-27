import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { Album } from '../../../types';
import { CreateAlbumDto } from '../../dtos/CreateAlbum.dto';
import { UpdateAlbumDto } from '../../dtos/UpdateAlbum.dto';

@Injectable()
export class AlbumsService {
  private fakeAlbums: Album[] = []

  getAlbums() {
    return this.fakeAlbums
  }

  createAlbum(albumData: CreateAlbumDto) {
    const id = uuidv4();
    this.fakeAlbums.push({ ...albumData, id })
    return this.fakeAlbums.filter(album => album.id === id)[0];
  }

  getAlbum(id: string) {
    return this.fakeAlbums.filter(album => album.id === id)[0]
  }

  updateAlbum(albumData: UpdateAlbumDto, id: string) {
    const artist = this.fakeAlbums.filter(album => album.id === id)[0]
    return { ...artist, ...albumData }
  }

  deleteAlbum(id: string) {
    this.fakeAlbums = this.fakeAlbums.filter(album => album.id !== id)
  }
}
