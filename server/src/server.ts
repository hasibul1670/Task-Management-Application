/* eslint-disable no-unused-vars */
import { Server } from 'http';
import mongoose from 'mongoose';
import { createClient } from 'redis';
import app from './app';
import config from './config';
export const client = createClient();
client.on('error', err => console.log('Redis Connection Error'));
client.on('connect', err => console.log('⚡⚡Redis is Connected'));
const redisConnect = async () => {
  await client.connect();
};
let serverStatus: Server;
async function server() {
  try {
    redisConnect();
    await mongoose.connect(config.database_url as string);
    console.log(`🛢 Database is connected successfully`);
    serverStatus = app.listen(config.port, () => {
      console.log(`listening on port ${config.port}`);
    });
  } catch (err) {
    console.error('Failed to connect database', err);
  }

  process.on('unhandledRejection', err => {
    console.error(err);

    if (serverStatus) {
      serverStatus.close(() => {
        console.error('server closed due to Unhandled Rejection.... ', err);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
}

server();

process.on('uncaughtException', err => {
  console.error('server closed due to Unhandled Exception.... ', err);
  process.exit(1);
});

process.on('SIGTERM', () => {
  console.log('SIGTERM is received of server is shutting down........');
  if (serverStatus) {
    serverStatus.close();
  }
});
