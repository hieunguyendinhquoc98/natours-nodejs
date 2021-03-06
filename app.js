const path = require('path');
const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xssClean = require('xss-clean');
const hpp = require('hpp');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const csp = require('./utils/csp');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const reviewRouter = require('./routes/reviewRoutes');
const bookingRouter = require('./routes/bookingRoutes');
const viewRouter = require('./routes/viewRoutes');

const app = express();
// 1)GLOBAL MIDDLEWARES
app.use(
  cors({
    credentials: true,
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
  })
);

//Setting view engine
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

//Serving static files
app.use(express.static(path.join(__dirname, 'public')));

//Set security HTTP Headers
app.use(helmet());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
//Limit request from same IP
const limiter = rateLimit({
  max: 1000,
  windowMs: 60 * 60 * 1000,
  message: 'Too many request from this IP, please try again after an hour!'
});
app.use('/api', limiter);

// Body parser, reading data from body into req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
//Data sanitization against NOSQL query injection
app.use(mongoSanitize());
//Data sanitization against XSS
app.use(xssClean());
//Prevent params polluion
app.use(
  hpp({
    whitelist: [
      'duration',
      'ratingsQuantity',
      'ratingsAverage',
      'maxGroupSize',
      'difficulty',
      'price'
    ]
  })
);
//Test middlewares
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  // eslint-disable-next-line no-console
  console.log(req.cookies);
  next();
});

// 3) ROUTES
//Content Security Policy setting

app.use('/', csp.loadCSPSupport, viewRouter);
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/reviews', reviewRouter);
app.use('/api/v1/bookings', bookingRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
