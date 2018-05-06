import {Request, Response, Router} from 'express'
import {passport} from './oneauth'

const route = Router()

route.get('/', passport.authenticate('oneauth'))

route.get('/callback', passport.authenticate('oneauth', {
  failureRedirect: '/login/fail',
  successReturnToOrRedirect: process.env.DISCOURSE_SITE_URL
}))

route.get('/fail', (req, res) => {
  //TODO: Actually inject error flash messages here
  res.status(500).send(`
  <h1>Login Failed</h1>
  <h3>Authentication Failed due to some reason</h3>
  Go back to <a href="${process.env.DISCOURSE_SITE_URL}">Discuss</a>
  `)
})

export {
  route
}