import { Body, Controller, Delete, Get, HttpCode, NotFoundException, Param, ParseUUIDPipe, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateTrackDto } from 'src/tracks/dtos/CreateTrack.dto';
import { UpdateTrackDto } from 'src/tracks/dtos/UpdateTrack.dto';
import { TracksService } from '../../services/tracks/tracks.service';

@Controller('track')
export class TracksController {

  constructor(private trackService: TracksService) { }

  @Get()
  getTracks() {
    return this.trackService.getTracks()
  }

  @Post()
  @UsePipes(new ValidationPipe())
  createTrack(@Body() trackData: CreateTrackDto) {
    const track = this.trackService.createTrack(trackData)
    return track
  }

  @Get(':id')
  getTrack(@Param('id', ParseUUIDPipe) id: string) {
    const track = this.trackService.getTrack(id)
    if (!track) {
      throw new NotFoundException('Track not found');
    }
    return track
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  updateTrack(@Body() trackData: UpdateTrackDto, @Param('id', ParseUUIDPipe) id: string) {
    const track = this.trackService.getTrack(id)
    if (!track) {
      throw new NotFoundException('Track not found');
    }

    return this.trackService.updateTrack(trackData, id)
  }

  @Delete(':id')
  @HttpCode(204)
  deleteTrack(@Param('id', ParseUUIDPipe) id: string) {
    const track = this.trackService.getTrack(id)

    if (!track) {
      throw new NotFoundException('Track not found');
    }

    this.trackService.deleteTrack(id)
  }

}
