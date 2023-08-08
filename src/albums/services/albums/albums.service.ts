import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AlbumEntity } from 'src/albums/entities/album.entity';
import { Repository } from 'typeorm';
import { CreateAlbumDto } from '../../dtos/CreateAlbum.dto';
import { UpdateAlbumDto } from '../../dtos/UpdateAlbum.dto';

@Injectable()
export class AlbumsService {

  constructor(
    @InjectRepository(AlbumEntity) private albumRepository: Repository<AlbumEntity>) { }

  async getAlbums() {
    return await this.albumRepository.find()
  }

  async createAlbum(albumData: CreateAlbumDto) {
    const newAlbum = this.albumRepository.create(albumData)
    return await this.albumRepository.save(newAlbum)
  }


  async getAlbum(id: string) {
    const album = await this.albumRepository.findOne({ where: { id } })
    return album
  }

  async updateAlbum(albumData: UpdateAlbumDto, id: string) {
    const album = await this.albumRepository.findOne({ where: { id } })

    const updatedAlbum = await this.albumRepository.save({ ...album, ...albumData })
    return updatedAlbum
  }

  async deleteAlbum(id: string) {
    await this.albumRepository.delete(id)
  }
}
