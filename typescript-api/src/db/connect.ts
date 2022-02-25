import mongoose from "mongoose";
import log from '../logger'

function connect(DB_URI: string) {
    return mongoose
        .connect(DB_URI)
        .then(() => {
            log.info("Database connected")
        })
        .catch((error) => {
            log.error("Db error: ", error)
            process.exit(1)
        })
}

export default connect;