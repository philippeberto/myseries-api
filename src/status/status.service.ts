import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateStatusInput } from './dto/create-status.input';
import { Status, StatusType } from './entities/status.entity';
import { StatusMapper } from './status.mapper';

@Injectable()
export class StatusService {
  constructor(
    @InjectRepository(Status)
    private statusRepository: Repository<Status>,
  ) {}

  async create(createStatusInput: CreateStatusInput, userId: string) {
    return await this.statusRepository.save(
      StatusMapper.createToEntity(createStatusInput, userId),
    );
  }

  async findAll(imdbId) {
    return await this.statusRepository.find({ where: { imdbId } });
  }

  findOne(id: number) {
    return `This action returns a #${id} status`;
  }

  async update(id: string, value: StatusType) {
    const status = await this.statusRepository.findOne(id);
    if (!status) throw new Error('Status not found.');
    status.value = value;
    await status.save();
    return true;
  }

  remove(id: number) {
    return `This action removes a #${id} status`;
  }
}
