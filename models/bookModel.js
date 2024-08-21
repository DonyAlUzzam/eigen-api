const db = require('../config/db');

const getAllBooks = async () => {
    const [rows] = await db.query('SELECT * FROM Books');
    return rows;
};

const getBookByCode = async (code) => {
    const [rows] = await db.query('SELECT * FROM Books WHERE code = ?', [code]);
    return rows[0];
};

const updateBookStock = async (code, stock) => {
    await db.query('UPDATE Books SET stock = ? WHERE code = ?', [stock, code]);
};

module.exports = { getAllBooks, getBookByCode, updateBookStock };
