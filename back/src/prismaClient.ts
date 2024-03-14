import { DefaultArgs } from "@prisma/client/runtime/library";
import { PrismaClient as MongoClient, Prisma } from "../prisma/generated/mongo_client";
import { PrismaClient as PostgresClient } from "../prisma/generated/postgres_client";
import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'

export const DATA_SOURCE = process.env.DATA_SOURCE ?? "mongo"

type ClientMongo = MongoClient<Prisma.PrismaClientOptions, never, DefaultArgs>
type ClientPostgres = PostgresClient<Prisma.PrismaClientOptions, never, DefaultArgs>


export let prismaClient: any

if (DATA_SOURCE === "postgres") {
    const connectionString = `${process.env.POSTGRES_URL}`
    const pool = new Pool({ connectionString })
    const adapter = new PrismaPg(pool)
    const postgresClient = new PostgresClient({ adapter });

    prismaClient = postgresClient
} else {
    const connectionString = `${process.env.MONGO_URL}`
    const pool = new Pool({ connectionString })
    const adapter = new PrismaPg(pool)
    const mongoClient = new MongoClient({ adapter });
    prismaClient = mongoClient
}