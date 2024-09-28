const passport = require('passport');
const bcrypt = require('bcryptjs');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const localStrategyOptions = {
  usernameField: 'username',
  passportField: 'password',
};

const jwtStrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Extract JWT from Authorization header
  secretOrKey: process.env.JWT_SECRET || 'your_secret_key',
};

const verifyLocal = async (username, password, done) => {
  try {
    const user = await prisma.user.findUnique({ where: { username } });

    if (!user) {
      return done(null, false, { message: 'Incorrect username' });
    }
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return done(null, false, { message: 'Incorrect password' });
    }
    return done(null, user);
  } catch (err) {
    return done(err);
  }
};

const verifyJwt = async (payload, done) => {
  try {
    const user = await prisma.user.findUnique({ where: { id: payload.userId } });

    if (!user) {
      return done(null, false);
    }
    return done(null, user);
  } catch (err) {
    return done(err);
  }
};

passport.use(new LocalStrategy(localStrategyOptions, verifyLocal));
passport.use(new JwtStrategy(jwtStrategyOptions, verifyJwt));

module.exports = passport;
