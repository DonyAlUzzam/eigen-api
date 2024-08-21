const db = require('../config/db');

const borrowBook = async (memberCode, bookCode, borrowDate) => {
    await db.query('INSERT INTO Borrows (member_code, book_code, borrow_date) VALUES (?, ?, ?)', [memberCode, bookCode, borrowDate]);
};

const returnBook = async (memberCode, bookCode, returnDate) => {
    await db.query('UPDATE Borrows SET return_date = ? WHERE member_code = ? AND book_code = ? AND return_date IS NULL', [returnDate, memberCode, bookCode]);
};

const getActiveBorrows = async () => {
    const [rows] = await db.query('SELECT * FROM Borrows WHERE return_date IS NULL');
    return rows;
};

module.exports = { borrowBook, returnBook, getActiveBorrows };
