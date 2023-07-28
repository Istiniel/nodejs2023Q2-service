import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/db/services/database/database.service';
import { Album, Artist } from 'src/types';

@Injectable()
export class FavoritesService {

  constructor(private dbService: DatabaseService) { }

  getAllFavorites() {
    const favorites = this.dbService.getAllFavorites();
    const tracks = favorites.tracks.map(trackId => {
      return this.dbService.getTrack(trackId)
    })
    const albums: Album[] = favorites.albums.map(albumId => {
      return this.dbService.getAlbum(albumId)
    })
    const artists: Artist[] = favorites.artists.map(artistId => {
      return this.dbService.getArtist(artistId)
    })


    return { tracks, albums, artists }
  }

  addTrack(id: string) {
    return this.dbService.addFavoriteTrack(id)
  }

  deleteTrack(id: string) {
    return this.dbService.deleteFavoriteTrack(id)
  }

  addAlbum(id: string) {
    return this.dbService.addFavoriteAlbum(id)
  }

  deleteAlbum(id: string) {
    return this.dbService.deleteFavoriteAlbum(id)
  }

  addArtist(id: string) {
    return this.dbService.addFavoriteArtist(id)
  }

  deleteArtist(id: string) {
    return this.dbService.deleteFavoriteArtist(id)
  }
}
