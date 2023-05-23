import cors from 'cors'
import { Express } from 'express'

export const router = (app: Express) => {

    app.use(
        cors({origin: '*', optionsSuccessStatus: 200})
    )

    
}