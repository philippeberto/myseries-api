import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { SeriesService } from './series.service';
import { Serie } from './entities/series.entity';
import { CreateSeriesInput } from './dto/create-series.input';
import { UpdateSeriesInput } from './dto/update-series.input';
import { SeriePublic } from './dto/serie';

@Resolver(() => Serie)
export class SeriesResolver {
  constructor(private readonly seriesService: SeriesService) {}

  @Mutation(() => SeriePublic)
  createSeries(
    @Args('createSeriesInput') createSeriesInput: CreateSeriesInput,
  ) {
    return this.seriesService.create(createSeriesInput);
  }

  @Query(() => [SeriePublic], { name: 'series' })
  findAll() {
    return this.seriesService.findAll();
  }

  @Query(() => SeriePublic, { name: 'series' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.seriesService.findOne(id);
  }

  @Mutation(() => SeriePublic)
  updateSeries(
    @Args('updateSeriesInput') updateSeriesInput: UpdateSeriesInput,
  ) {
    return this.seriesService.update(updateSeriesInput.id, updateSeriesInput);
  }

  @Mutation(() => SeriePublic)
  removeSeries(@Args('id', { type: () => Int }) id: number) {
    return this.seriesService.remove(id);
  }
}
