import mongoose from 'mongoose';
import app from './app.js';
import config from './config/config.js';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let server: any;
mongoose.connect(config.mongooseUri).then(() => {
  server = app.listen(config.port, () => {
    console.log(`Server is running on port ${config.port}`);
  });
});


const exitHandler = () => {
  if (server) {
    server.close(() => {
      console.log('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error: NodeJS.ErrnoException) => {
  console.log(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  console.log('SIGTERM RECEIVED. Shutting down gracefully');
  if (server) server.close();
});
