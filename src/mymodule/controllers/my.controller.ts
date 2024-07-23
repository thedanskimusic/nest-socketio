import { Controller, Get } from '@nestjs/common';
import { MyService } from '../services/my.service';


export type MyHello = {
  message: string;
}

@Controller('api/my/hello') // This sets the path prefix for all methods in this controller
export class MyController {

  constructor(
    private readonly myService: MyService
  ){}

  @Get()
  hello(): MyHello {
    return {
      message: this.myService.hello()
    };
  }
}