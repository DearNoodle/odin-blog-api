require('dotenv').config();
const express = require('express');
const cors = require('cors');
const authRouter = require('./routes/authRoutes');
const postRouter = require('./routes/postRoutes');
const commentRouter = require('./routes/commentRoutes');
const app = express();

app.use(
  cors({
    origin: '*',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Access-Control-Allow-Origin', 'Content-Type', 'Authorization'],
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
