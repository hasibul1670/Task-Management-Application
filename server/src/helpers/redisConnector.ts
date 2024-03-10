/* eslint-disable no-unused-vars */
import { createClient } from 'redis';

export const client = createClient({
  url: 'redis://default:GFEIiWQa68I70dTXUoBKJbKKK8x0Ch0s@redis-15524.c251.east-us-mz.azure.cloud.redislabs.com:15524',
});
// export const client = createClient();
client.on('error', err => console.log('Redis Connection Error'));
client.on('connect', () => console.log('⚡⚡Redis is Connected'));
const redisConnect = async () => {
  await client.connect();
};
redisConnect();
