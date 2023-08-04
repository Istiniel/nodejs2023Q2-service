import { Body, ClassSerializerInterceptor, Controller, Delete, Get, HttpCode, NotFoundException, Param, ParseUUIDPipe, Post, Put, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateAlbumDto } from '../../dtos/CreateAlbum.dto';
import { UpdateAlbumDto } from '../../dtos/UpdateAlbum.dto';
import { AlbumsService } from '../../services/albums/albums.service';

@Controller('album')
@UseInterceptors(ClassSerializerInterceptor)
export class AlbumsController {

  constructor(private albumService: AlbumsService) { }

  @Get()
  async getAlbums() {
    return await this.albumService.getAlbums()
  }

  @Post()
  @UsePipes(new ValidationPipe())
  async createAlbum(@Body() albumData: CreateAlbumDto) {
    const album = await this.albumService.createAlbum(albumData)
    return album
  }

  @Get(':id')
  async getAlbum(@Param('id', ParseUUIDPipe) id: string) {
    const album = await this.albumService.getAlbum(id)

    if (!album) {
      throw new NotFoundException('Album not found');
    }
    return album
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  async updateAlbum(@Body() albumData: UpdateAlbumDto, @Param('id', ParseUUIDPipe) id: string) {
    const album = await this.albumService.getAlbum(id)
    if (!album) {
      throw new NotFoundException('Album not found');
    }

    return await this.albumService.updateAlbum(albumData, id)
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteAlbum(@Param('id', ParseUUIDPipe) id: string) {
    const album = await this.albumService.getAlbum(id)

    if (!album) {
      throw new NotFoundException('Album not found');
    }

    this.albumService.deleteAlbum(id)
  }
}
