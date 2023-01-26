import bodyParser from 'body-parser';
import compression from 'compression';
import MongoStore from 'connect-mongo';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express, { Express, NextFunction, Request, Response } from 'express';
import mongoSanitize from 'express-mongo-sanitize';
import session from 'express-session';
import helmet from 'helmet';
import morgan from 'morgan';

import config from './config/config.js';
import HttpError from './helper/error/http-error.js';
import { errorConverter, errorHandler } from './middleware/error.js';
import { authLimiter } from './middleware/rateLimiter.js';
import routes from './routes/v1/index.js';
// import { doCovert } from './utils/convert-xml/index.js';

// import morgan from './config/morgan.js';
// import swaggerJSDoc from 'swagger-jsdoc';
// import swaggerUi from 'swagger-ui-express';

// import swaggerDefinition from './docs/swaggerDef.js';
// import morgan from 'morgan';
// import rateLimit from 'express-rate-limit';
// import RateLimitMongoStorke from 'rate-limit-mongo';

// import { logger } from './utils/store-logs/logger.js';

dotenv.config();

const app: Express = express();

// if (config.env !== 'test') {
//   app.use(morgan.successHandler);
//   app.use(morgan.errorHandler);
// }

/* =========== Connect database =========== */

declare module 'express-session' {
  export interface SessionData {
    userId: string;
  }
}

// connectDB();

/* =========== Initial express, bodyParser, session and cors =========== */

// app.set('trust proxy', 1);
// set security HTTP headers
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);

app.use(bodyParser.urlencoded({ extended: true, limit: '1kb' }));
app.use(bodyParser.json({ limit: '1kb' }));

// sanitize request data
app.use(mongoSanitize());

// gzip compression
app.use(compression());

app.use(
  cors({
    origin:
      process.env.CLIENT_URL /* `http://${ip.address()}:8000` */ ??
      'http://localhost:8000',
    credentials: true,
  })
);
app.use(cookieParser());
// static folder "./public" for images
app.use('/public', express.static('public'));
app.use(
  session({
    secret: process.env.SESSION_SECRET ?? 'secret',
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI ?? 'mongodb://0.0.0.0:27017/hospital',
    }),
    resave: true,
    saveUninitialized: false,
    rolling: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 7,
      // httpOnly: true,
      // secure: process.env.NODE_ENV === 'production' ? true : false,
      // sameSite: process.env.NODE_ENV === 'production' ? 'strict' : false,
    },
  })
);

/* =========== Rate Limit =========== */

if (config.env === 'production') {
  app.use('/api/v1/auth', authLimiter);
}


// const limiter = rateLimit({
//   windowMs: 10 * 60 * 1000,
//   max: 200,
//   standardHeaders: true,
//   legacyHeaders: false,
//   message: {
//     message: 'تعداد درخواست شما بیش از حد مجاز است، لطفا بعدا تلاش کنید',
//   },
//   handler: (request, response, next, options) => {
//     logger.info(`${request.ip} has exceeded the rate limit.`);
//     response.status(options.statusCode).send(options.message);
//   },
//   // store: new RateLimitMongoStore({
//   //   uri: process.env.MONGO_URI,
//   //   expireTimeMs: 30 * 60 * 1000,
//   // }),
//   keyGenerator: (req) => req.ip,
// });

// app.use(limiter);

// doCovert();

/* =========== Routes =========== */

app.use(morgan('dev'));

app.use('/', routes);

// const specs = swaggerJSDoc({
//   swaggerDefinition,
//   apis: ['./docs/*.yml', './routes/user.route.js'],
// });
// app.use(
//   '/api-docs',
//   swaggerUi.serve,
//   swaggerUi.setup(specs, {
//     explorer: true,
//   })
// );

/* =========== 404 & ErrorHandler =========== */

app.use((/* req: Request, res: Response, next: NextFunction */) => {
  throw new HttpError('صفحه مورد نظر یافت نشد!', 404);
});

app.use(
  (
    error: NodeJS.ErrnoException,
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    if (res.headersSent) {
      return next(error);
    }
    if (!error.code) return;
    res
      .status(+error.code ?? 500)
      .json({ message: error.message || 'خطا در برقراری ارتباط' });
  }
);

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

export default app;

// const port = process.env.PORT ?? 5000;

// const server = http.createServer(app);

// const server = http.createServer((req, res) => {
//   getRawBody(req)
//     .then((buf) => {
//       res.statusCode = 200;
//       res.end(buf.length + ' bytes submitted');
//     })
//     .catch((err) => {
//       res.statusCode = err.statusCode;
//       res.end(err.message);
//     });
// });

// server.listen(
//   +port,
//   /* '0.0.0.0', */ () => {
//     console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
//   }
// );

// app.listen(port, () => {
//   console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
// });

// http.createServer(app).listen(+port /* , ip.address() */, () => {
//   console.log(
//     `⚡️[server]: Server is running at http://${ip.address()}:${port}`
//   );
// });
