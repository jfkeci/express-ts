import { Controller } from "@nestjs/common";
import { UserStateService } from "./user-state.service";

@Controller("")
export class UserStateController {
  constructor(private readonly userStateService: UserStateService) {}
}
