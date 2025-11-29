import express, { json } from 'express';
import logger from './middlewares/error/logger';
import responder from './middlewares/error/responder';
import notFound from './middlewares/not-found';
import authRouter from "./routers/auth";
import vacationsRouter from "./routers/vacation";
import likesRouter from "./routers/like";
import config from 'config';
import sequelize from './db/sequelize';
import cors from 'cors';
import { createAppBucketIfNotExists } from './s3/s3';
import fileUpload from 'express-fileupload';

async function start() {
  const app = express();

  const port = config.get<number>('app.port');
  const appName = config.get<string>('app.name');

  app.use(cors());
  app.use(json());
  app.use(fileUpload())

  // Routers
  app.use('/auth', authRouter);
  app.use('/vacations', vacationsRouter);
  app.use('/likes', likesRouter);

  // Not found
  app.use(notFound);

  // Error middlewares
  app.use(logger);
  app.use(responder);

  // Sync DB
  await sequelize.sync({ force: process.argv[2] === 'sync' });

  // Create S3 bucket if not exists
  await createAppBucketIfNotExists();

  console.log(process.argv);

  app.listen(port, () =>
    console.log(`${appName} started on port ${port}`)
  );
}

start().catch(err => {
  console.error( err);
});
