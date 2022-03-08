import dotenv from 'dotenv'
import express from 'express'

import config from 'config'
import dbConnect from './utils/dbConnect';
import log from './utils/logger';

const app = express();

const port = config.get('port');

app.listen(port, () => {
    log.info(`Server started @${port}`)

    dbConnect();
})