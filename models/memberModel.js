const db = require('../config/db');

const getAllMembers = async () => {
    const [rows] = await db.query('SELECT * FROM Members');
    return rows;
};

const getMemberByCode = async (code) => {
    const [rows] = await db.query('SELECT * FROM Members WHERE code = ?', [code]);
    return rows[0];
};

module.exports = { getAllMembers, getMemberByCode };
