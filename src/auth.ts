import {Request, Response, Router} from 'express'
import DiscourseSSO from 'discourse-sso'
import url from 'url'
import {ensureLoggedIn} from 'connect-ensure-login'
import {OneauthProfile} from 'passport-oneauth'

const route = Router()
const sso = new DiscourseSSO(<string>process.env.DISCOURSE_SSO_SECRET)
const discourseRedirectPath = url.resolve(process.env.DISCOURSE_SITE_URL!, '/session/sso_login')

route.get('/',
  ensureLoggedIn('/login'), // Ensure user is logged in before authing for Discourse
  (req: Request, res: Response) => {
    const {PAYLOAD, SIG} = req.query
    const user = req.user as OneauthProfile

    if (!user.verifiedemail) {
      //TODO: Flash verified email reason
      return res.redirect('/login/fail')
    }
    if (!sso.validate(PAYLOAD, SIG)) {
      //TODO: Flash PAYLOAD verification fail message
      return res.redirect('/login/fail')
    }
    const nonce = sso.getNonce(PAYLOAD)
    const loginString = sso.buildLoginString({
      nonce,
      email: user.verifiedemail,
      external_id: user.id,
      username: user.username,
      name: user.name,
      avatar_url: user.photo,
      moderator: user.role === 'employee',
      admin: user.role === 'admin'
    })
    res.redirect(discourseRedirectPath + '?' + loginString)

  })

export {
  route
}