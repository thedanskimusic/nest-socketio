import { Controller, Get } from '@nestjs/common';
import { TestService } from 'src/services/test.service';

type TestMessageResponse = {
  message: string;
}

@Controller('api/test') // This sets the path prefix for all methods in this controller
export class TestController {

  constructor(
    private readonly testService: TestService
  ){}

  @Get() // This method handles GET requests to the root path (/test)
  getTestMessage(): TestMessageResponse {
    return {
      message: this.testService.helloMessage()
    };
  }
}