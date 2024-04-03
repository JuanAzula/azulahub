import { DefaultArgs } from "@prisma/client/runtime/library";
import { PrismaClient as MongoClient, Prisma } from "../../prisma/generated/mongo_client/index.js";
import { PrismaClient as PostgresClient } from "../../prisma/generated/postgres_client/index.js";

import pkg from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'

// Cloudinary config
import { v2 as cloudinary } from 'cloudinary';
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});





// Prisma config
const { Pool } = pkg

export const DATA_SOURCE = process.env.DATA_SOURCE ?? "mongo"

type ClientMongo = MongoClient<Prisma.PrismaClientOptions, never, DefaultArgs>
type ClientPostgres = PostgresClient<Prisma.PrismaClientOptions, never, DefaultArgs>


export let prismaClient: any
console.log(DATA_SOURCE)
if (DATA_SOURCE === "postgres") {
    const connectionString = `${process.env.POSTGRES_URL}`
    const pool = new Pool({ connectionString })
    const adapter = new PrismaPg(pool)
    const postgresClient: ClientPostgres = new PostgresClient({ adapter });
    console.log('postgresClient')
    prismaClient = postgresClient
} else {
    const mongoClient: ClientMongo = new MongoClient();
    console.log('mongoClient')
    prismaClient = mongoClient
}