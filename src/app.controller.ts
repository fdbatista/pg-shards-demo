import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { Consumption } from './entities/consumption.entity';

@Controller('consumption')
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  async findAllConsumption(): Promise<Consumption[]> {
    return await this.appService.getTotalConsumption()
  }

  @Get(':deviceId')
  async findDeviceConsumption(@Param('deviceId') deviceId: string): Promise<Consumption[]> {
    return await this.appService.getDeviceConsumption(deviceId)
  }
}
