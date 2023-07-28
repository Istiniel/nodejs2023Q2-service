import { Body, Controller, Delete, Get, HttpCode, NotFoundException, Param, ParseUUIDPipe, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateAlbumDto } from '../../dtos/CreateAlbum.dto';
import { UpdateAlbumDto } from '../../dtos/UpdateAlbum.dto';
import { AlbumsService } from '../../services/albums/albums.service';

@Controller('album')
export class AlbumsController {

  constructor(private albumService: AlbumsService) { }

  @Get()
  getAlbums() {
    return this.albumService.getAlbums()
  }

  @Post()
  @UsePipes(new ValidationPipe())
  createAlbum(@Body() albumData: CreateAlbumDto) {
    const album = this.albumService.createAlbum(albumData)
    return album
  }

  @Get(':id')
  getAlbum(@Param('id', ParseUUIDPipe) id: string) {
    const album = this.albumService.getAlbum(id)
    if (!album) {
      throw new NotFoundException('Album not found');
    }
    return album
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  updateAlbum(@Body() albumData: UpdateAlbumDto, @Param('id', ParseUUIDPipe) id: string) {
    const album = this.albumService.getAlbum(id)
    if (!album) {
      throw new NotFoundException('Album not found');
    }

    return this.albumService.updateAlbum(albumData, id)
  }

  @Delete(':id')
  @HttpCode(204)
  deleteAlbum(@Param('id', ParseUUIDPipe) id: string) {
    const album = this.albumService.getAlbum(id)

    if (!album) {
      throw new NotFoundException('Album not found');
    }

    this.albumService.deleteAlbum(id)
  }
}
