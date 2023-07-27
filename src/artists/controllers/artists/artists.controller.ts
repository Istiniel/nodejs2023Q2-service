import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param, ParseUUIDPipe, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { ArtistsService } from '../../services/artists/artists.service';
import { UpdateArtistDto } from '../../dtos/UpdateArtist.dto';
import { CreateArtistDto } from '../../dtos/CreateArtist.dto';

@Controller('artists')
export class ArtistsController {

  constructor(private artistService: ArtistsService) { }

  @Get()
  getArtists() {
    return this.artistService.getArtists()
  }

  @Post()
  @UsePipes(new ValidationPipe())
  createArtist(@Body() artistData: CreateArtistDto) {
    return this.artistService.createArtist(artistData)
  }

  @Get(':id')
  getArtist(@Param('id', ParseUUIDPipe) id: string) {
    const artist = this.artistService.getArtist(id)
    if (!artist) {
      throw new HttpException('Artist not found', HttpStatus.NOT_FOUND)
    }
    return artist
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  updateArtist(@Body() artistData: UpdateArtistDto, @Param('id', ParseUUIDPipe) id: string) {
    const artist = this.artistService.getArtist(id)
    if (!artist) {
      throw new HttpException('Artist not found', HttpStatus.BAD_REQUEST)
    }

    return this.artistService.updateArtist(artistData, id)
  }

  @Delete(':id')
  @HttpCode(204)
  deleteArtist(@Param('id', ParseUUIDPipe) id: string) {
    const artist = this.artistService.getArtist(id)

    if (!artist) {
      throw new HttpException('Artist not found', HttpStatus.BAD_REQUEST)
    }

    this.artistService.deleteArtist(id)
  }
}
