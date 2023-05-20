import dotenv from 'dotenv'
import * as mysql from 'mysql2/promise'

dotenv.config()

export async function connect(){
    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        })

        return connection
    } catch (err) {
        console.log('Error connecting to Database: ', err)
    }
}