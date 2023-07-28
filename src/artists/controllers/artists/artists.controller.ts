import { Body, Controller, Delete, Get, HttpCode, NotFoundException, Param, ParseUUIDPipe, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateArtistDto } from '../../dtos/CreateArtist.dto';
import { UpdateArtistDto } from '../../dtos/UpdateArtist.dto';
import { ArtistsService } from '../../services/artists/artists.service';

@Controller('artist')
export class ArtistsController {

  constructor(private artistService: ArtistsService) { }


  @Get()
  getArtists() {
    return this.artistService.getArtists()
  }

  @Post()
  @UsePipes(new ValidationPipe())
  createArtist(@Body() artistData: CreateArtistDto) {
    const artist = this.artistService.createArtist(artistData)
    return artist
  }

  @Get(':id')
  getArtist(@Param('id', ParseUUIDPipe) id: string) {
    const artist = this.artistService.getArtist(id)
    if (!artist) {
      throw new NotFoundException('Artist not found');
    }
    return artist
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  updateArtist(@Body() artistData: UpdateArtistDto, @Param('id', ParseUUIDPipe) id: string) {
    const artist = this.artistService.getArtist(id)
    if (!artist) {
      throw new NotFoundException('Artist not found');
    }

    return this.artistService.updateArtist(artistData, id)
  }

  @Delete(':id')
  @HttpCode(204)
  deleteArtist(@Param('id', ParseUUIDPipe) id: string) {
    const artist = this.artistService.getArtist(id)

    if (!artist) {
      throw new NotFoundException('Artist not found');
    }

    this.artistService.deleteArtist(id)
  }
}
