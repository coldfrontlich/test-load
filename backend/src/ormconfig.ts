import { DataSource } from 'typeorm';

export default new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST || 'localhost',
  port: parseInt(process.env.POSTGRES_PORT || '5435'),
  username: process.env.POSTGRES_USER || 'user',
  password: process.env.POSTGRES_PASSWORD || 'password',
  database: process.env.POSTGRES_DB || 'db',
  entities: ['src/**/*.entity.ts'],
  migrations: ['src/migrations/*.ts'],
  synchronize: false,
  extra: {
    max: 50,
    min: 5,
    idleTimeoutMillis: 10000,
  },
});
