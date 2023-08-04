import { Body, ClassSerializerInterceptor, Controller, Delete, Get, HttpCode, NotFoundException, Param, ParseUUIDPipe, Post, Put, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateArtistDto } from '../../dtos/CreateArtist.dto';
import { UpdateArtistDto } from '../../dtos/UpdateArtist.dto';
import { ArtistsService } from '../../services/artists/artists.service';

@Controller('artist')
@UseInterceptors(ClassSerializerInterceptor)
export class ArtistsController {

  constructor(private artistService: ArtistsService) { }

  @Get()
  async getArtists() {
    return await this.artistService.getArtists()
  }

  @Post()
  @UsePipes(new ValidationPipe())
  async createArtist(@Body() artistData: CreateArtistDto) {
    const artist = await this.artistService.createArtist(artistData)
    return artist
  }

  @Get(':id')
  async getArtist(@Param('id', ParseUUIDPipe) id: string) {
    const artist = await this.artistService.getArtist(id)
    if (!artist) {
      throw new NotFoundException('Artist not found');
    }
    return artist
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  async updateArtist(@Body() artistData: UpdateArtistDto, @Param('id', ParseUUIDPipe) id: string) {
    const artist = await this.artistService.getArtist(id)
    if (!artist) {
      throw new NotFoundException('Artist not found');
    }

    return this.artistService.updateArtist(artistData, id)
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteArtist(@Param('id', ParseUUIDPipe) id: string) {
    const artist = await this.artistService.getArtist(id)

    if (!artist) {
      throw new NotFoundException('Artist not found');
    }

    this.artistService.deleteArtist(id)
  }
}
