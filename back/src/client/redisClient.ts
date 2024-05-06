
import { RedisClientType, RedisFunctions, RedisModules, RedisScripts, createClient } from 'redis';
// Redis config

const redisConfig: any = {
    host: 'redis',
    port: process.env.REDIS_PORT || 6379,
}

export let redisClient: any
redisClient = await createClient({
    url: process.env.REDIS_URL
})
    .on('error', (err: any) => console.log('Redis Client Error', err))
    .connect()
