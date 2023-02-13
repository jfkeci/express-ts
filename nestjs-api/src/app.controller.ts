import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Healthcheck')
@Controller()
export class AppController {
  @Get()
  @ApiOkResponse({
    description: 'Returns "Blue App Backend" if server is running'
  })
  healthcheck() {
    return 'Blue App Backend';
  }
}
