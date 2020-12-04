import { Module } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';
import { todoProviders } from './entities/todo.providers';
import { DatabaseModule } from '../database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [TodoController],
  providers: [...todoProviders, TodoService],
})
export class TodoModule {}
