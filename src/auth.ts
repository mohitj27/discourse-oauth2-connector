import {Request, Response, Router} from 'express'
import DiscourseSSO from 'discourse-sso'
import url from 'url'
import {ensureLoggedIn} from 'connect-ensure-login'
import {OneauthProfile} from 'passport-oneauth'

const route = Router()
const dSSO = new DiscourseSSO(<string>process.env.DISCOURSE_SSO_SECRET)
const discourseRedirectPath = url.resolve(process.env.DISCOURSE_SITE_URL!, '/session/sso_login')

route.get('/',
  ensureLoggedIn('/login'), // Ensure user is logged in before authing for Discourse
  (req: Request, res: Response) => {
    const {sso, sig} = req.query
    const user = req.user as OneauthProfile

    if (!user.verifiedemail) {
      //TODO: Flash verified email reason
      return res.redirect('/login/fail')
    }
    if (!dSSO.validate(sso, sig)) {
      //TODO: Flash PAYLOAD verification fail message
      return res.redirect('/login/fail')
    }
    const nonce = dSSO.getNonce(sso)
    const loginString = dSSO.buildLoginString({
      nonce,
      email: user.verifiedemail,
      external_id: user.id,
      username: user.username,
      name: user.name,
      avatar_url: user.photo,
      moderator: user.role === 'employee' || user.role === 'admin' || user.role === 'intern',
      admin: user.role === 'admin'
    })
    res.redirect(discourseRedirectPath + '?' + loginString)

  })

export {
  route
}