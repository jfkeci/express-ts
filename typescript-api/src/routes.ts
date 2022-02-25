import { Express, Request, Response } from 'express'
export default function (app: Express) {
    app.get('/healthcheck', (req: Request, res: Response) => {
        return res.sendStatus(200);
    })
}