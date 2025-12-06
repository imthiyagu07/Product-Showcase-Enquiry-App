import sqlite3 from 'sqlite3';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.join(__dirname, '../database.db');

if (fs.existsSync(dbPath)) {
    fs.unlinkSync(dbPath);
    console.log('Existing database removed');
}

const db = new sqlite3.Database(dbPath);

const schema = fs.readFileSync(path.join(__dirname, '../../schema.sql'), 'utf8');
const seed = fs.readFileSync(path.join(__dirname, '../../seed.sql'), 'utf8');

db.serialize(() => {
    db.exec(schema, (err) => {
        if (err) {
            console.error('Error creating schema:', err);
            return;
        }
        console.log('Database schema created successfully');

        db.exec(seed, (err) => {
            if (err) {
                console.error('Error seeding data:', err);
                return;
            }
            console.log('Sample data inserted successfully');

            db.close(() => {
                console.log('Database initialized and closed');
            });
        });
    });
});
