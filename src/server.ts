import express, {Application} from 'express'
import session from 'express-session'
import {passport} from './oneauth'
import {route as loginRoute} from './login'
import {route as authRoute} from './auth'
import debug from 'debug'
const log = debug('discourse-oauth2:server')

const app: Application = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: <string>process.env.SESSION_SECRET
}))

app.use(passport.initialize())
app.use(passport.session())

app.use('/login', loginRoute)
app.use('/auth', authRoute)

app.listen(process.env.PORT, () => {
  log(`Server started on http://localhost:${process.env.PORT}`)
})