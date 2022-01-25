import redis from 'redis'
import config from '../config/config.js'


let redisClient = redis.createClient({
    host: config.REDIS_URL,
    port: config.REDIS_PORT
})

redisClient.on('error', (error) => { console.log('Redis connection failed')})
redisClient.on('connect', () => { console.log('Redis connection success!')})

export default redisClient;