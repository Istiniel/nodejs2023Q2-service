import { Test, TestingModule } from '@nestjs/testing';
import { AlbumsController } from './albums.controller';

describe('AlbumController', () => {
  let controller: AlbumsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AlbumsController],
    }).compile();

    controller = module.get<AlbumsController>(AlbumsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
