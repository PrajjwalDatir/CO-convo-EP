import passport from 'passport';
import passportJwt from 'passport-jwt';
import { User } from '../models/User';

const { Strategy: JwtStrategy, ExtractJwt } = passportJwt;

// example config taken from:
// http://www.passportjs.org/packages/passport-jwt/
const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

function useJWTStrategy() {
  passport.use(
    new JwtStrategy(options, (jwtPayload, done) =>
      User.findOne({ _id: jwtPayload.id })
        .select('-password')
        .exec()
        .then(user => done(null, user || false))
        .catch(err => done(err, false)),
    ),
  );
}

export default useJWTStrategy;
