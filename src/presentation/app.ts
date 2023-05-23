import dotenv from 'dotenv'
import express from 'express'
import { connect } from '../infra/db/connection'



const initApp = async () => {

    try {

        const connection = await connect();
        
        dotenv.config()

        const app = express()

        const port = process.env.PORT || 3030

        app.listen(port, () => {console.log("Server listening at port ", port)})

    } catch (err) {
        console.error('Error initializing server ', err)
    }
}