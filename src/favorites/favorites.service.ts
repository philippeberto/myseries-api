import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Favorite } from './entities/favorite.entity';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(Favorite)
    private favoriteRepository: Repository<Favorite>,
  ) {}

  async findByUser(userId: string) {
    let favorite = await this.favoriteRepository.findOne({
      where: {
        userId: userId,
      },
    });
    if (!favorite) {
      throw new Error('The user does not have any favorite.');
    }
    return favorite;
  }

  async addFavorite(imdbId: string, userId: string) {
    let favorite = await this.favoriteRepository.findOne({
      where: {
        userId: userId,
      },
    });
    if (!favorite) {
      console.log(`Favorite doesn't exists. It will be created now.`);
      favorite = new Favorite();
      favorite.userId = userId;
      favorite.favoritesList = [imdbId];
      await favorite.save();
    }
    if (favorite.favoritesList.includes(imdbId)) {
      throw new Error('This title is already a favorite.');
    }
    favorite.favoritesList.push(imdbId);
    await favorite.save();

    return favorite;
  }

  async removeFavorite(imdbId: string, userId: string) {
    let favorite = await this.favoriteRepository.findOne({
      where: {
        userId,
      },
    });
    if (!favorite) {
      throw new Error(`Favorite doesn't exists. `);
    }

    favorite.favoritesList = favorite.favoritesList.filter((item) => {
      return item !== imdbId;
    });
    await favorite.save();

    return favorite;
  }
}
