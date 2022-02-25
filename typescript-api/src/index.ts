import express from 'express'
import dotenv from 'dotenv'
import connect from './db/connect'
import log from './logger'

import routes from './routes'

dotenv.config()

const app = express()

const port = process.env.PORT as string
const host = process.env.HOST as string
const dbUri = process.env.DB_URI as string

app.use(express.json())
app.use(express.urlencoded({ extended: false }))


app.listen(parseInt(port), host, () => {
    log.info(`Server listening at http://${host}:${port}`)

    connect(dbUri)

    routes(app)
})