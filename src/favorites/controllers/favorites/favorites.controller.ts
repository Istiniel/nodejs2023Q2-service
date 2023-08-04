import { Controller, Delete, Get, HttpCode, NotFoundException, Param, ParseUUIDPipe, Post, UnprocessableEntityException } from '@nestjs/common';
import { ArtistsService } from 'src/artists/services/artists/artists.service';
import { FavoritesService } from 'src/favorites/services/favorites/favorites.service';

@Controller('favs')
export class FavoritesController {

  constructor(
    private favsService: FavoritesService,
    private artistsService: ArtistsService) { }

  @Get()
  getFavorites() {
    return this.favsService.getAllFavorites();
  }


  @Post('track/:id')
  addFavoriteTrack(@Param('id', ParseUUIDPipe) id: string) {
    // const track = this.tracksService.getTrack(id)

    // if (!track) {
    //   throw new UnprocessableEntityException('Track not found');
    // }

    this.favsService.addTrack(id)
  }

  @Post('album/:id')
  addFavoriteAlbum(@Param('id', ParseUUIDPipe) id: string) {
    // const album = this.albumsService.getAlbum(id)

    // if (!album) {
    //   throw new UnprocessableEntityException('Album not found');
    // }

    this.favsService.addAlbum(id)
  }

  @Post('artist/:id')
  addFavoriteArtist(@Param('id', ParseUUIDPipe) id: string) {
    const artist = this.artistsService.getArtist(id)

    if (!artist) {
      throw new UnprocessableEntityException('Artist not found');
    }

    this.favsService.addArtist(id)
  }

  @Delete('album/:id')
  @HttpCode(204)
  deleteFavoriteAlbum(@Param('id', ParseUUIDPipe) id: string) {
    const isDeleted = this.favsService.deleteAlbum(id)

    if (!isDeleted) {
      throw new NotFoundException('Album not found');
    }
  }

  @Delete('artist/:id')
  @HttpCode(204)
  deleteFavoriteArtist(@Param('id', ParseUUIDPipe) id: string) {
    const isDeleted = this.favsService.deleteArtist(id)

    if (!isDeleted) {
      throw new NotFoundException('Artist not found');
    }
  }

  @Delete('track/:id')
  @HttpCode(204)
  deleteFavoriteTrack(@Param('id', ParseUUIDPipe) id: string) {
    const isDeleted = this.favsService.deleteTrack(id)

    if (!isDeleted) {
      throw new NotFoundException('Track not found');
    }
  }

}
