import dotenv from 'dotenv'
import * as mysql from 'mysql'

dotenv.config()

export const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})

export const connect = () => {
    connection.connect((err) => {
        if (err) {
            console.error('Error connecting to database: ', err)
            return
        }

        console.log("Connected to database")
    })
}