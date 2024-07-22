import { Module } from '@nestjs/common';
import { EventsGateway } from './events.gateway';
import { UserSocketService } from 'src/services/user-socker.service';

@Module({
  providers: [EventsGateway, UserSocketService],
})
export class EventsModule {}
