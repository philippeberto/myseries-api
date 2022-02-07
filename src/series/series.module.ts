import { Module } from '@nestjs/common';
import { SeriesService } from './series.service';
import { SeriesResolver } from './series.resolver';
import { Serie } from './entities/series.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Serie])],
  providers: [SeriesResolver, SeriesService],
})
export class SeriesModule {}
