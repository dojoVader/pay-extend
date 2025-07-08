import { DataSource } from 'typeorm';

export const TypeORMariaDBProvider = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const datasource = new DataSource({
        type: 'mariadb',
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        entities: [__dirname + '../dashboard/dtos/entities/*.entity{.ts,.js}'],
        synchronize: true,
        logging: false,
      });
      return datasource.initialize();
    },
  },
];
