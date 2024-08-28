import { Test, TestingModule } from "@nestjs/testing";
import { NetWorthsController } from "./net-worths.controller";
import { NetWorthsService } from "./net-worths.service";

describe("NetWorthsController", () => {
  let controller: NetWorthsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NetWorthsController],
      providers: [NetWorthsService],
    }).compile();

    controller = module.get<NetWorthsController>(NetWorthsController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
