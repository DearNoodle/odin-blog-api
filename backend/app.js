require('dotenv').config();
const express = require('express');
const authRouter = require('./routes/authRoutes');
const postRouter = require('./routes/postRoutes');
const commentRouter = require('./routes/commentRoutes');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const passport = require('./configs/passportConfig');
app.use(passport.initialize());

app.use('/api', authRouter);
app.use('/api', postRouter);
app.use('/api', commentRouter);

const PORT = process.env.PORT || 3000;
// '0.0.0.0' host required for railway deploy
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Listening on port ${PORT}!`);
});
