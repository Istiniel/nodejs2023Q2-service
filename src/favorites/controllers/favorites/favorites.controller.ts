import { Controller, Delete, Get, HttpCode, NotFoundException, Param, ParseUUIDPipe, Post, UnprocessableEntityException } from '@nestjs/common';
import { FavoritesService } from 'src/favorites/services/favorites/favorites.service';

@Controller('favs')
export class FavoritesController {

  constructor(
    private favsService: FavoritesService) { }

  @Get()
  async getFavorites() {
    return await this.favsService.getAllFavorites();
  }


  @Post('track/:id')
  async addFavoriteTrack(@Param('id', ParseUUIDPipe) id: string) {
    const track = await this.favsService.addTrack(id)

    if (!track) {
      throw new UnprocessableEntityException('Track not found');
    }
  }

  @Post('album/:id')
  async addFavoriteAlbum(@Param('id', ParseUUIDPipe) id: string) {
    const album = await this.favsService.addAlbum(id)

    if (!album) {
      throw new UnprocessableEntityException('Album not found');
    }
  }

  @Post('artist/:id')
  async addFavoriteArtist(@Param('id', ParseUUIDPipe) id: string) {
    const artist = await this.favsService.addArtist(id)

    if (!artist) {
      throw new UnprocessableEntityException('Artist not found');
    }
  }

  @Delete('album/:id')
  @HttpCode(204)
  async deleteFavoriteAlbum(@Param('id', ParseUUIDPipe) id: string) {
    const isDeleted = await this.favsService.deleteAlbum(id)

    if (!isDeleted.affected) {
      throw new NotFoundException('Album not found');
    }
  }

  @Delete('artist/:id')
  @HttpCode(204)
  async deleteFavoriteArtist(@Param('id', ParseUUIDPipe) id: string) {
    const isDeleted = await this.favsService.deleteArtist(id)

    if (!isDeleted.affected) {
      throw new NotFoundException('Artist not found');
    }
  }

  @Delete('track/:id')
  @HttpCode(204)
  async deleteFavoriteTrack(@Param('id', ParseUUIDPipe) id: string) {
    const isDeleted = await this.favsService.deleteTrack(id)

    if (!isDeleted.affected) {
      throw new NotFoundException('Track not found');
    }
  }
}
