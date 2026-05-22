import { Pool } from 'pg';



export const pool = new Pool({
    connectionString: process.env.CONNECTIONSTRING,
    ssl: {
        rejectUnauthorized: false
    }
});
pool.connect()
    .then(() => {
        console.log('Connected to the database successfully');
    })
    .catch((error: any) => {
        console.error('Failed to connect to the database', error);
    });

const initDB = async () => {
    try {
        await pool.query(`CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            email VARCHAR(100) UNIQUE NOT NULL,
            password TEXT NOT NULL,
            role VARCHAR(50) NOT NULL default 'contributor',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )`);

        await pool.query(`CREATE TABLE IF NOT EXISTS issues (
            id SERIAL PRIMARY KEY,
            title VARCHAR(150) NOT NULL,
            description TEXT NOT NULL,
            type VARCHAR(50) NOT NULL,
            status VARCHAR(50) NOT NULL default 'open',
            reporter_id INTEGER REFERENCES users(id),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )`);
        console.log('Database initialized successfully');
    } catch (error: any) {
        console.error('Error initializing the database', error);
    }
}

export default initDB;