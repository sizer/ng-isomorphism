import { Connection } from 'typeorm';
import { Todo } from './todo.entity';

export const todoProviders = [
  {
    provide: 'TODO_REPOSITORY',
    useFactory: (conn: Connection) => conn.getRepository(Todo),
    inject: ['DATABASE_CONNECTION'],
  },
];
