declare module 'passport-oneauth' {
  import {Strategy as Oauth2Strategy} from 'passport-oauth2'
  class OneauthStrategy extends Oauth2Strategy {

  }
  type Strategy = OneauthStrategy;
  const Strategy: typeof OneauthStrategy;
}