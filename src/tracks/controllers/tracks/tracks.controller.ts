import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param, ParseUUIDPipe, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { TracksService } from '../../services/tracks/tracks.service';
import { CreateTrackDto } from '../../dtos/CreateTrack.dto';
import { UpdateTrackDto } from '../../dtos/UpdateTrack.dto';

@Controller('track')
export class TracksController {

  constructor(private trackService: TracksService) { }

  @Get()
  getUsers() {
    return this.trackService.getTracks()
  }

  @Post()
  @UsePipes(new ValidationPipe())
  createUser(@Body() trackData: CreateTrackDto) {
    return this.trackService.createTrack(trackData)
  }

  @Get(':id')
  getUser(@Param('id', ParseUUIDPipe) id: string) {
    const track = this.trackService.getTrack(id)
    if (!track) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND)
    }
    return track
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  updateTrack(@Body() trackData: UpdateTrackDto, @Param('id', ParseUUIDPipe) id: string) {
    const user = this.trackService.getTrack(id)
    if (!user) {
      throw new HttpException('Track does not exists', HttpStatus.BAD_REQUEST)
    }


    return this.trackService.updateTrack(trackData, id)
  }

  @Delete(':id')
  @HttpCode(204)
  deleteUser(@Param('id', ParseUUIDPipe) id: string) {
    const track = this.trackService.getTrack(id)

    if (!track) {
      throw new HttpException('Track does not exists', HttpStatus.BAD_REQUEST)
    }

    this.trackService.deleteTrack(id)
  }

}
