import { Injectable } from '@nestjs/common';

@Injectable()
export class TestService {
  helloMessage(): string {
    return 'Hello world!';
  }
}