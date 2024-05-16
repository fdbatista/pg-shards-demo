import "reflect-metadata"
import { DataSource } from "typeorm"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: 'pg-shard-1',
    port: 5432,
    username: 'db',
    password: 'db',
    database: 'db',
    logging: false,
    synchronize: false,
    migrations: ["src/migrations/*.ts"],
    subscribers: [],
    migrationsTableName: "migrations",
})
