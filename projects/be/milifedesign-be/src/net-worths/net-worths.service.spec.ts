import { Test, TestingModule } from "@nestjs/testing";
import { NetWorthsService } from "./net-worths.service";

describe("NetWorthsService", () => {
  let service: NetWorthsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NetWorthsService],
    }).compile();

    service = module.get<NetWorthsService>(NetWorthsService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
