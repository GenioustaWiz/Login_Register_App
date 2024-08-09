
const db = require('../config/database');
const bcrypt = require('bcryptjs');

class User{
    static async create(email, username, password){
        const hashedPassword = await bcrypt.hash(password, 10);
        const [results] = await db.execute(
            'INSERT INTO users (email, username, password) VALUES (?,?,?)',
            [email, username, hashedPassword]
        );
        return results.insertId;
    }

    static async findByEmail(email){
        const[rows] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
        return rows[0];
    }

    static async findByUsername(username){
        const[rows] = await db.execute('SELECT * FROM users WHERE username = ?', [username]);
        return rows[0];
    }

    static async verifyPassword(password, hashedPassword){
        return bcrypt.compare(password, hashedPassword);
    }
}

module.exports = User;
