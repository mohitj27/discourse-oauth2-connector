import express, {Application} from 'express'
import debug from 'debug'
const log = debug('discourse-oauth2:server')

const app: Application = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.listen(process.env.PORT, () => {
  log(`Server started on http://localhost:${process.env.PORT}`)
})