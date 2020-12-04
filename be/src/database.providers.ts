import { createConnection } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async () =>
      await createConnection({
        type: 'mysql',
        host: '127.0.0.1',
        port: 3306,
        username: 'root',
        password: 'password',
        database: 'development',
        entities: ['dist/**/*.entity{.ts,.js}'],
        synchronize: true,
      }),
  },
];
