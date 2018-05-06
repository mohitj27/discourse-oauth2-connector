import express, {Application} from 'express'
import session from 'express-session'
import memorystore from 'memorystore'
import {passport} from './oneauth'
import {route as loginRoute} from './login'
import {route as authRoute} from './auth'
import debug from 'debug'
const log = debug('discourse-oauth2:server')
const MemoryStore = memorystore(session)

const app: Application = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(session({
  store: new MemoryStore({
    checkPeriod: 1000 * 60 * 60 * 10, // Check till 10 minutes,
    max: 100, // don't keep too many objects in memory
    ttl: 1000 * 60 * 60 * 5, // 5 minute TTL is good
  }),
  resave: true,
  saveUninitialized: true,
  secret: <string>process.env.SESSION_SECRET
}))

app.use(passport.initialize())
//TODO: Disable self session auth. Login via Oneauth always
app.use(passport.session())

app.use('/login', loginRoute)
app.use('/auth', authRoute)
app.get('/', (req, res) => {
  res.redirect(process.env.DISCOURSE_SITE_URL)
})

app.listen(process.env.PORT, () => {
  log(`Server started on http://localhost:${process.env.PORT}`)
})