import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './entities/todo.entity';

@Injectable()
export class TodoService {
  constructor(@Inject('TODO_REPOSITORY') private repo: Repository<Todo>) {}

  create({ title }: CreateTodoDto) {
    return this.repo.save([{ title, completed: false }]);
  }

  findAll(): Promise<Todo[]> {
    return this.repo.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} todo`;
  }

  update(id: number, { title, completed }: UpdateTodoDto) {
    return this.repo.findOne(id).then((aEntity) =>
      this.repo.save({
        id,
        title,
        completed,
      }),
    );
  }

  remove(id: number) {
    return `This action removes a #${id} todo`;
  }
}
