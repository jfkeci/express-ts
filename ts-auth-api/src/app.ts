import dotenv from 'dotenv'
import express from 'express'
import config from 'config'
import dbConnect from './utils/dbConnect'
import log from './utils/logger'
import router from './routes'

dotenv.config()

const app = express()

app.use('/api', router)

const port = config.get('port')

app.listen(port, () => {
    log.info(`Server started @${port}`)

    dbConnect()
})