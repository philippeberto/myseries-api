import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { FavoritesService } from './favorites.service';
import { Favorite } from './entities/favorite.entity';
import { FavoritePublic } from './dto/favorite';
import { AuthenticatedUser } from 'src/auth/authenticated-user.decorator';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/gql-auth.guard';
import { User } from 'src/models/user.model';

@Resolver(() => Favorite)
export class FavoritesResolver {
  constructor(private readonly favoritesService: FavoritesService) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => FavoritePublic)
  findFavoritesByUser(@AuthenticatedUser() user: User) {
    return this.favoritesService.findByUser(user.id);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => FavoritePublic)
  addFavorite(@AuthenticatedUser() user: User, @Args('imdbId') imdbId: string) {
    return this.favoritesService.addFavorite(imdbId, user.id);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => FavoritePublic)
  removeFavorite(
    @AuthenticatedUser() user: User,
    @Args('imdbId') imdbId: string,
  ) {
    return this.favoritesService.removeFavorite(imdbId, user.id);
  }
}
