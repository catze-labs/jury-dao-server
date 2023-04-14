import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  // Use @cron in *.service.ts
  @Cron('10 * * * * *')
  handleCron() {
    this.logger.debug('Cron handler called');
  }
}
