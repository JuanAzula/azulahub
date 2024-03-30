
import { RedisClientType, RedisFunctions, RedisModules, RedisScripts, createClient } from 'redis';
// Redis config

async function createRedisClient() {
    redisClient = await createClient()
        .on('error', err => console.log('Redis Client Error', err))
        .connect();
    return redisClient
}
const client = await createRedisClient()
export let redisClient: RedisClientType<RedisModules, RedisFunctions, RedisScripts> = client
