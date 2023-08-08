import { ConfigService, registerAs } from "@nestjs/config";
import { config } from 'dotenv';
import { DataSource, DataSourceOptions } from "typeorm";

config();

const configService = new ConfigService();

export const dataSource = {
  type: 'postgres',
  host: configService.get('POSTGRES_HOST'),
  port: +configService.get('POSTGRES_PORT'),
  username: configService.get('POSTGRES_USER'),
  password: configService.get('POSTGRES_PASSWORD'),
  database: configService.get('POSTGRES_DB'),
  entities: ['dist/**/*.entity.{js,ts}'],
  migrations: ['dist/**/db/migrations/*.{js,ts}'],
  migrationsRun: true,
  // dev
  // synchronize: true,
  // autoLoadEntities: true,
  // prod
  synchronize: false,
  autoLoadEntities: false,
};

export default registerAs('typeorm', () => dataSource)
export const connectionSource = new DataSource(dataSource as DataSourceOptions);
