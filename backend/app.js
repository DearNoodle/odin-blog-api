require('dotenv').config();
const express = require('express');
const cors = require('cors');
const authRouter = require('./routes/authRoutes');
const postRouter = require('./routes/postRoutes');
const commentRouter = require('./routes/commentRoutes');
const app = express();

app.use(
  cors({
    origin: [
      'https://incredible-sundae-f3517b.netlify.app/',
      'https://sparkly-twilight-9574c8.netlify.app/',
      'http://localhost:5173/',
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const passport = require('./configs/passportConfig');
app.use(passport.initialize());

const cookieParser = require('cookie-parser');
app.use(cookieParser());

app.use('/api', authRouter);
app.use('/api', postRouter);
app.use('/api', commentRouter);

const PORT = process.env.PORT || 3000;
// '0.0.0.0' host required for railway deploy
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Listening on port ${PORT}!`);
});
