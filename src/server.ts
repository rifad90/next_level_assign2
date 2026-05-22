import express, { type Request, type Response } from 'express'
import config from './config/config'
import initDB from './db'


const app = express()

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!')
})

app.listen(config.port, () => {
    initDB();
    console.log(`Example app listening on port ${config.port}`)
})

