import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param, ParseUUIDPipe, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { AlbumsService } from '../../services/albums/albums.service';
import { CreateAlbumDto } from '../../dtos/CreateAlbum.dto';
import { UpdateAlbumDto } from '../../dtos/UpdateAlbum.dto';

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
    return this.albumService.createAlbum(albumData)
  }

  @Get(':id')
  getAlbum(@Param('id', ParseUUIDPipe) id: string) {
    const album = this.albumService.getAlbum(id)
    if (!album) {
      throw new HttpException('Album not found', HttpStatus.NOT_FOUND)
    }
    return album
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  updateAlbum(@Body() albumData: UpdateAlbumDto, @Param('id', ParseUUIDPipe) id: string) {
    const album = this.albumService.getAlbum(id)
    if (!album) {
      throw new HttpException('Album not found', HttpStatus.BAD_REQUEST)
    }

    return this.albumService.updateAlbum(albumData, id)
  }

  @Delete(':id')
  @HttpCode(204)
  deleteAlbum(@Param('id', ParseUUIDPipe) id: string) {
    const album = this.albumService.getAlbum(id)

    if (!album) {
      throw new HttpException('Album not found', HttpStatus.BAD_REQUEST)
    }

    this.albumService.deleteAlbum(id)
  }
}
