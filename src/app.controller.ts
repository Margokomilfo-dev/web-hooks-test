import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Post()
  createMeeting() {
    return this.appService.createMeeting();
  }

  //push notifications
  @Post('catch/all/events')
  createEvent(@Body() dto: any) {
    console.log('in controller');
    return this.appService.createEvent(dto);
  }
}
