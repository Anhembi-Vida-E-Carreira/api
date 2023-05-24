import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import initRouter from './routes'

const initApp = async () => {

    try {
        dotenv.config()
        const app = express()
        app.use(cors())
        app.use(express.json())
        await initRouter(app)

        const port = process.env.PORT || 3030
        app.listen(port, () => {console.log("Server listening at port ", port)})

    } catch (err) {
        console.error('Error initializing server ', err)
    }
}

initApp()