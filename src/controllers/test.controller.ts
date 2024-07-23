import { Controller, Get } from '@nestjs/common';

type TestMessageResponse = {
  message: string;
}

@Controller('api/test') // This sets the path prefix for all methods in this controller
export class TestController {
  @Get() // This method handles GET requests to the root path (/test)
  getTestMessage(): TestMessageResponse {
    return {
      message: 'Hello tester'
    };
  }
}