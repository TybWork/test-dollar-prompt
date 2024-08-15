import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import passport from 'passport';
import { User } from '../models/User/user.model.js';

export const googleOAuth = () => {
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/auth/google/callback",
        scope: ['profile', 'email']
    },
        async (accessToken, refreshToken, profile, done) => {
            try {
                // Find or create user
                let user = await User.findOne({ email: profile.emails[0].value });

                if (!user) {
                    user = await User.create({
                        name: profile.displayName,
                        email: profile.emails[0].value,
                        password: '123', // Default password; handle securely
                        is_verified: true,
                    });
                }

                done(null, user);
            } catch (error) {
                done(error, null);
            }
        }));

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            const user = await User.findById(id);
            done(null, user);
        } catch (error) {
            done(error, null);
        }
    });
};
