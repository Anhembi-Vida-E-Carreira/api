import dotenv from 'dotenv'
import { DataSource } from 'typeorm'
import 'reflect-metadata'

dotenv.config()

const connectDatabase = () => {
    const datasource = new DataSource(
        {
            host: process.env.DB_HOST || '',
            username: process.env.DB_USER || '',
            password: process.env.DB_PASSWORD || '',
            database: process.env.DB_NAME || '',
            port: 3306,
            type: 'mysql'
        }
    )
    datasource.initialize().then(() => console.log('Connected to Database')).catch((err) => console.log(err))  
    
    return datasource
}

export const Database = connectDatabase()
