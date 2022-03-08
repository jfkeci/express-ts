import mongoose from 'mongoose'
import config from 'config'
import log from './logger'

async function dbConnect() {
    const dbUser = config.get<string>('dbUser')
    const dbPass = config.get<string>('dbPass')
    const dbName = config.get<string>('dbName')

    try {
        mongoose.connect(`mongodb+srv://${dbUser}:${dbPass}@cluster0.gg0cz.mongodb.net/${dbName}?retryWrites=true&w=majority`)
            .then(() => { log.info('connected to db') })
    } catch (error) {
        process.exit(1);
    }
}

export default dbConnect;