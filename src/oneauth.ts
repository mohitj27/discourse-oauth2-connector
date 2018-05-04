import passport from 'passport'
import {Strategy as OneauthStrategy} from 'passport-oneauth'
import path from 'path'

passport.serializeUser(((user, done) => {
  done(user)
}))

passport.deserializeUser((id, done) => {

})

const oneauthStrategy = new OneauthStrategy({
  clientID: <string>process.env.ONEAUTH_CLIENT_ID,
  clientSecret: <string>process.env.ONEAUTH_CLIENT_SECRET,
  authorizationURL: 'https://account.codingblocks.com/oauth/authorize',
  callbackURL: path.join(<string>process.env.HOST, 'callback'),
  tokenURL: 'https://account.codingblocks.com/oauth/token'
}, (accessToken: string, refreshToken: string, profile: any, done: Function) => {

})

passport.use(oneauthStrategy)

export {
  passport
}
