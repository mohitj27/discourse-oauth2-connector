import {Request, Response, Router} from 'express'
import DiscourseSSO from 'discourse-sso'

const route = Router()
const sso = new DiscourseSSO(<string>process.env.DISCOURSE_SSO_SECRET)

route.get('/', (req: Request, res: Response) => {
  const {PAYLOAD, SIG} = req.query
  if (sso.validate(PAYLOAD, SIG)) {
    const nonce = sso.getNonce(PAYLOAD)

  } else {
    res.status(500).json({error: 'Invalid Request Format'})
  }
})

export {
  route
}