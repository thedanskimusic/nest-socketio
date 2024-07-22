import { Module } from '@nestjs/common';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { EventsModule } from './events/events.module';
import { TestController } from './controllers/test.controller';
import { UserSocketService } from './services/user-socker.service';

@Module({
  imports: [
    EventsModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
      exclude: ['/api*']
    }),
  ],
  controllers: [TestController],
  providers: [UserSocketService]
})
export class AppModule {}
