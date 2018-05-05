import {Request, Response, Router} from 'express'
import {passport} from './oneauth'

const route = Router()

route.get('/', passport.authenticate('oneauth'))

route.get('/callback', passport.authenticate('oneauth', {
  failureRedirect: '/login/fail',
  successReturnToOrRedirect: 'https://account.codingblocks.com'
}))

export {
  route
}