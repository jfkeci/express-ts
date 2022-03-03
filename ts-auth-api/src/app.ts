import dotenv from 'dotenv'
import express from 'express'
import config from 'config'
import { connectDb } from './utils/dbConnect'
dotenv.config()


const app = express()

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`App started at port ${port}`)

    connectDb()
})
