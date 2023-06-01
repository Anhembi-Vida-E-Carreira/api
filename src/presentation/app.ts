import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import initRouter from './routes'
import bodyParser from 'body-parser'
import "reflect-metadata"

const initApp = async () => {

    try {
        dotenv.config()
        const app = express()
        app.use(cors())
        app.use(bodyParser.json({ limit: '10mb' })); // Adjust the limit as needed
        app.use(bodyParser.urlencoded({ limit: '10mb', extended: true })); // Adjust the limit as needed
        await initRouter(app)

        const port = process.env.PORT || 3030
        app.listen(port, () => {console.log("Server listening at port", port)})

    } catch (err) {
        console.error('Error initializing server', err)
    }
}

initApp()