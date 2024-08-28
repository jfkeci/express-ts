import { Test, TestingModule } from '@nestjs/testing';
import { SportsClassesController } from './sports-classes.controller';
import { SportsClassesService } from './sports-classes.service';

describe('SportsClassesController', () => {
  let controller: SportsClassesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SportsClassesController],
      providers: [SportsClassesService],
    }).compile();

    controller = module.get<SportsClassesController>(SportsClassesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
