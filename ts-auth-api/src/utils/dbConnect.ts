import mongoose from 'mongoose'
import config from 'config'
import { log } from './logger'

export const connectDb = async () => {
    const dbUri = config.get<string>('dbUri')

    try {
        await mongoose.connect(dbUri, () => {
            console.log('Connected to database');
            log.info("Connected to db")
        })
    } catch (error) {
        process.exit(1)
    }
}