import { Test, TestingModule } from '@nestjs/testing';
import { SportsClassesService } from './sports-classes.service';

describe('SportsClassesService', () => {
  let service: SportsClassesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SportsClassesService],
    }).compile();

    service = module.get<SportsClassesService>(SportsClassesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
