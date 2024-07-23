import { Injectable } from '@nestjs/common';

@Injectable()
export class MyService {
  hello(): string {
    return 'Hello';
  }
}