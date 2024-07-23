import { Module } from '@nestjs/common';
import { EventsGateway } from './events.gateway';
import { UserSocketService } from 'src/services/user-socker.service';
import { UserPreferenceService } from 'src/services/user-preference.service';

@Module({
  providers: [EventsGateway, UserSocketService, UserPreferenceService],
})
export class EventsModule {}
