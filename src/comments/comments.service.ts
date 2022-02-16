import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommentMapper } from './comments.mapper';
import { CreateCommentInput } from './dto/create-comment.input';
import { UpdateCommentInput } from './dto/update-comment.input';
import { Comment } from './entities/comment.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment) private commentRepository: Repository<Comment>,
  ) {}

  async create(createCommentInput: CreateCommentInput, id: string) {
    return await this.commentRepository.save(
      CommentMapper.createToEntity(createCommentInput, id),
    );
  }

  async findAll(imdbId: string) {
    return await this.commentRepository.find({ where: { imdbId } });
  }

  findOne(id: string) {
    return `This action returns a #${id} comment`;
  }

  async update(id: string, text: string) {
    const comment = await this.commentRepository.findOne(id);
    if (!comment) throw new Error('Comment not found.');
    comment.text = text;
    await comment.save();
    return true;
  }

  remove(id: number) {
    return `This action removes a #${id} comment`;
  }
}
