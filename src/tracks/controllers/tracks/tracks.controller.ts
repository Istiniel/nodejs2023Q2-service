import { Body, ClassSerializerInterceptor, Controller, Delete, Get, HttpCode, NotFoundException, Param, ParseUUIDPipe, Post, Put, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateTrackDto } from 'src/tracks/dtos/CreateTrack.dto';
import { UpdateTrackDto } from 'src/tracks/dtos/UpdateTrack.dto';
import { TracksService } from '../../services/tracks/tracks.service';

@Controller('track')
@UseInterceptors(ClassSerializerInterceptor)
export class TracksController {

  constructor(private trackService: TracksService) { }

  @Get()
  async getTracks() {
    return await this.trackService.getTracks()
  }

  @Post()
  @UsePipes(new ValidationPipe())
  async createTrack(@Body() trackData: CreateTrackDto) {
    const track = await this.trackService.createTrack(trackData)
    return track
  }

  @Get(':id')
  async getTrack(@Param('id', ParseUUIDPipe) id: string) {
    const track = await this.trackService.getTrack(id)
    if (!track) {
      throw new NotFoundException('Track not found');
    }
    return track
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  async updateTrack(@Body() trackData: UpdateTrackDto, @Param('id', ParseUUIDPipe) id: string) {
    const track = await this.trackService.getTrack(id)
    if (!track) {
      throw new NotFoundException('Track not found');
    }

    return await this.trackService.updateTrack(trackData, id)
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteTrack(@Param('id', ParseUUIDPipe) id: string) {
    const track = await this.trackService.getTrack(id)

    if (!track) {
      throw new NotFoundException('Track not found');
    }

    this.trackService.deleteTrack(id)
  }
}
