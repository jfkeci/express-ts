import {cleanEnv, str, port} from 'envalid';

function validateEnv(): void {
    cleanEnv(process.env, {
        NODE_ENV: str({
            choices: ['development', 'production']
        }),
        DB_URI: str(),
        PORT: port({default: 3000}),
        SECRET: str()
    })
}

export default validateEnv;