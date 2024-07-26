import express from 'express';
import dotenv from 'dotenv';
import { json } from 'body-parser';
import hpp from 'hpp';
import rateLimit from 'express-rate-limit';
import cors from 'cors';
import morgan from 'morgan';
import userRoute from './src/routes/userRoute';
import { error } from 'console';

dotenv.config();

const app = express();
const port: number = Number(process.env.PORT) || 8001;

app.use(json());
app.use(hpp());

// for dev purpose
app.use(
  cors({
    origin: '*'
  })
);

app.use(morgan('dev'));

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
  })
);

app.use('/api/v1/user', userRoute);

app.listen(port, () => {
  console.log(`User server at http://localhost:${port}`);
});
