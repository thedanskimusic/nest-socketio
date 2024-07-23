import { Module } from '@nestjs/common';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { EventsModule } from './events/events.module';
import { TestController } from './controllers/test.controller';
import { TestService } from './services/test.service';
import { MyModule } from './mymodule/my.module';

@Module({
  imports: [
    EventsModule,
    MyModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
      exclude: ['/api*']
    }),
  ],
  controllers: [TestController],
  providers: [TestService]
})
export class AppModule {}
