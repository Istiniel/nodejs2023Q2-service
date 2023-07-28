import { Injectable } from '@nestjs/common';
import { UpdateAlbumDto } from 'src/albums/dtos/UpdateAlbum.dto';
import { UpdateArtistDto } from 'src/artists/dtos/UpdateArtist.dto';
import { UpdateTrackDto } from 'src/tracks/dtos/UpdateTrack.dto';
import { Album, Artist, TempDatabase, Track, User } from 'src/types';
import UpdatePasswordDto from 'src/users/dtos/UpdatePassword.dto';

@Injectable()
export class DatabaseService {
  private data: TempDatabase = {
    users: [],
    tracks: [],
    artists: [],
    albums: [],
    favs: []
  }

  getUsers() {
    return this.data.users
  }

  createUser(userData: User) {
    this.data.users.push(userData)
    return userData;
  }

  getUser(id: string) {
    return this.data.users.filter(user => user.id === id)[0]
  }

  updatePassword(userData: UpdatePasswordDto, id: string) {
    const user = this.data.users.filter(user => user.id === id)[0]
    const updatedTime = new Date().getTime()
    const newUser: User = { ...user, version: user.version + 1, password: userData.newPassword, updatedAt: updatedTime }
    this.data.users = this.data.users.map(user => {
      if (user.id === id) {
        return newUser
      }

      return user
    })

    return newUser
  }

  deleteUser(id: string) {
    this.data.users = this.data.users.filter(user => user.id !== id)
  }


  getAlbums() {
    return this.data.albums
  }

  createAlbum(albumData: Album) {
    this.data.albums.push(albumData)
    return albumData;
  }

  getAlbum(id: string) {
    return this.data.albums.filter(album => album.id === id)[0]
  }

  updateAlbum(albumData: UpdateAlbumDto, id: string) {
    const album = this.data.albums.filter(album => album.id === id)[0]

    const newAlbum: Album = { ...album, ...albumData }

    this.data.albums = this.data.albums.map(album => {
      if (album.id === id) {
        return newAlbum
      }

      return album
    })

    return newAlbum
  }

  deleteAlbum(id: string) {
    this.data.albums = this.data.albums.filter(album => album.id !== id)
    this.data.tracks = this.data.tracks.map(track => {
      if (track.albumId === id) {
        return { ...track, albumId: null }
      }

      return track
    })
  }

  getTracks() {
    return this.data.tracks
  }

  createTrack(trackData: Track) {
    this.data.tracks.push(trackData)
    return this.data.tracks.filter(track => track.id === trackData.id)[0];
  }

  getTrack(id: string) {
    return this.data.tracks.filter(track => track.id === id)[0]
  }

  updateTrack(trackData: UpdateTrackDto, id: string) {
    const track = this.data.tracks.filter(track => track.id === id)[0]

    const newTrack: Track = { ...track, ...trackData }

    this.data.tracks = this.data.tracks.map(track => {
      if (track.id === id) {
        return newTrack
      }

      return track
    })

    return newTrack
  }

  deleteTrack(id: string) {
    this.data.tracks = this.data.tracks.filter(track => track.id !== id)
  }

  getArtists() {
    return this.data.artists
  }

  createArtist(artistData: Artist) {
    this.data.artists.push(artistData)
    return this.data.artists.filter(artist => artist.id === artistData.id)[0];
  }

  getArtist(id: string) {
    return this.data.artists.filter(artist => artist.id === id)[0]
  }

  updateArtist(artistData: UpdateArtistDto, id: string) {
    const artist = this.data.artists.filter(artist => artist.id === id)[0]

    const newArtist: Artist = { ...artist, ...artistData }

    this.data.artists = this.data.artists.map(artist => {
      if (artist.id === id) {
        return newArtist
      }

      return artist
    })

    return newArtist
  }

  deleteArtist(id: string) {
    this.data.artists = this.data.artists.filter(artist => artist.id !== id)

    this.data.albums = this.data.albums.map(album => {
      if (album.artistId === id) {
        return { ...album, artistId: null }
      }

      return album
    })

    this.data.tracks = this.data.tracks.map(track => {
      if (track.artistId === id) {
        return { ...track, artistId: null }
      }

      return track
    })
  }

}
