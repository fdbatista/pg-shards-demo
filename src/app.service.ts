import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Consumption } from './entities/consumption.entity';
import { Repository } from 'typeorm/repository/Repository';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Consumption, 'shard1')
    private readonly consumptionRepositoryShard1: Repository<Consumption>,

    @InjectRepository(Consumption, 'shard2')
    private readonly consumptionRepositoryShard2: Repository<Consumption>,

    @InjectRepository(Consumption, 'shard3')
    private readonly consumptionRepositoryShard3: Repository<Consumption>,
  ) { }

  async getDeviceConsumption(deviceId: string): Promise<Consumption[]> {
    const repository = this.getRepositoryForDevice(deviceId)

    return repository.find({
      where: { source_id: deviceId }
    })
  }

  async getTotalConsumption(): Promise<Consumption[]> {
    const promises = [
      this.consumptionRepositoryShard1.find(),
      this.consumptionRepositoryShard2.find(),
      this.consumptionRepositoryShard3.find(),
    ]

    const results = await Promise.all(promises)
    return results.flatMap(item => item)
  }

  private getRepositoryForDevice(deviceId: string): Repository<Consumption> {
    switch (deviceId) {
      case '1':
        return this.consumptionRepositoryShard1;
      case '2':
        return this.consumptionRepositoryShard2;
      default:
        return this.consumptionRepositoryShard3;
    }
  }
}
