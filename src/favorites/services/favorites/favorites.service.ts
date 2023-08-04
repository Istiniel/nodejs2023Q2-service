import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FavoriteAlbumEntity } from 'src/favorites/entities/favoriteAlbum.entity';
import { FavoriteArtistEntity } from 'src/favorites/entities/favoriteArtist.entity';
import { FavoriteTrackEntity } from 'src/favorites/entities/favoriteTrack.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FavoritesService {

  constructor(
    @InjectRepository(FavoriteAlbumEntity) private albumRepository: Repository<FavoriteAlbumEntity>,
    @InjectRepository(FavoriteTrackEntity) private trackRepository: Repository<FavoriteTrackEntity>,
    @InjectRepository(FavoriteArtistEntity) private artistRepository: Repository<FavoriteArtistEntity>,
  ) { }

  async getAllFavorites() {
    const tracks = (await this.trackRepository.find()).map(favorite => favorite.track);
    const albums = (await this.albumRepository.find()).map(favorite => favorite.album);
    const artists = (await this.artistRepository.find()).map(favorite => favorite.artist);

    return { tracks, albums, artists }
  }

  async addTrack(id: string) {
    try {
      const favoriteTrack = this.trackRepository.create({ id })
      await this.trackRepository.save(favoriteTrack)
      const track = await this.trackRepository.findOne({
        where: { id },
        relations: { track: true }
      })

      return track
    } catch (error) {
      return null
    }
  }

  async deleteTrack(id: string) {
    return await this.trackRepository.delete(id)
  }

  async addAlbum(id: string) {
    try {
      const favoriteAlbum = this.albumRepository.create({ id })
      await this.albumRepository.save(favoriteAlbum)
      const album = await this.albumRepository.findOne({
        where: { id },
        relations: { album: true }
      })

      return album
    } catch (error) {
      return null
    }
  }

  async deleteAlbum(id: string) {
    return await this.albumRepository.delete(id)
  }

  async addArtist(id: string) {
    try {
      const favoriteArtist = this.artistRepository.create({ id })
      await this.artistRepository.save(favoriteArtist)
      const artist = await this.artistRepository.findOne({
        where: { id },
        relations: { artist: true }
      })

      return artist
    } catch (error) {
      return null
    }
  }

  async deleteArtist(id: string) {
    return await this.artistRepository.delete(id)
  }
}

