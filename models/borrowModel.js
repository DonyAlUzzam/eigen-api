const db = require('../config/db');

const borrowBook = async (memberCode, bookCode, borrowDate) => {
    await db.query('INSERT INTO Borrows (member_code, book_code, borrow_date) VALUES (?, ?, ?)', [memberCode, bookCode, borrowDate]);
};

const returnBook = async (memberCode, bookCode, returnDate) => {
    const [rows] = await db.query('UPDATE Borrows SET return_date = ? WHERE member_code = ? AND book_code = ? AND return_date IS NULL', [returnDate, memberCode, bookCode]);
    return rows;
};

const getActiveBorrows = async () => {
    const [rows] = await db.query('SELECT * FROM Borrows WHERE return_date IS NULL');
    return rows;
};

const getActiveBorrowsMember = async (memberCode, bookCode) => {
    const [rows] = await db.query('SELECT * FROM Borrows WHERE member_code = ? AND book_code = ? AND return_date IS NULL', [memberCode, bookCode]);
    return rows;
};

const getBorrowStats = async () => {
    const query = `
        SELECT m.code AS memberCode, m.name, COUNT(bb.book_code) AS borrowedBooksCount
        FROM members m
        LEFT JOIN borrows bb ON m.code = bb.member_code
        GROUP BY m.code
    `;
    const [results] = await db.query(query);

    return results;
   
};


module.exports = { borrowBook, returnBook, getActiveBorrows, getBorrowStats, getActiveBorrowsMember };
