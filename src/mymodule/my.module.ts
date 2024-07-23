import { Module } from '@nestjs/common';
import { MyController } from './controllers/my.controller';
import { MyService } from './services/my.service';

@Module({
  controllers: [MyController],
  providers: [MyService],
})
export class MyModule {}
