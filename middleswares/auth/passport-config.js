const LocalStrategy = require('passport-local').Strategy;
const User = require('../../models/user'); 

module.exports = (passport) => {
    passport.use(
        new LocalStrategy({ usernameField: 'name' }, async (name, password, done) => {
            try {
                const user = await User.findOne({ name }); // Authenticate by `name`
                if (!user) return done(null, false, { message: 'User not found' });

                const isMatch = await user.comparePassword(password);
                if (!isMatch) return done(null, false, { message: 'Incorrect password' });

                return done(null, user);
            } catch (err) {
                return done(err);
            }
        })
    );

    // Serialize user to store user ID in session
    passport.serializeUser((user, done) => done(null, user.id));

    // Deserialize user to retrieve the user from the session
    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => done(err, user));
    });
};
