const borrowModel = require('../models/borrowModel');
const bookModel = require('../models/bookModel');
const penaltyModel = require('../models/penaltyModel');
const { successResponse, errorResponse } = require('../response/response');

const borrowBook = async (req, res) => {
    const { memberCode, bookCode } = req.body;

    const activeBorrows = await borrowModel.getActiveBorrows();
    const borrowedBooks = activeBorrows.filter(borrow => borrow.member_code === memberCode).length;

    if (borrowedBooks >= 2) {
        return res.status(400).json(errorResponse('Member has already borrowed 2 books'));
    }

    const book = await bookModel.getBookByCode(bookCode);
    if (book.stock <= 0) {
        return res.status(400).json(errorResponse('Book is not available'));
    }

    const isPenalized = await penaltyModel.getPenaltyByMember(memberCode);
    if (isPenalized) {
        return res.status(400).json(errorResponse('Member is currently penalized'));
    }

    await borrowModel.borrowBook(memberCode, bookCode, new Date());
    await bookModel.updateBookStock(bookCode, book.stock - 1);
    res.status(200).json(successResponse('Book borrowed successfully'));
};

const returnBook = async (req, res) => {
    const { memberCode, bookCode } = req.body;

    const book = await bookModel.getBookByCode(bookCode);
    const borrow = await borrowModel.returnBook(memberCode, bookCode, new Date());

    if (!borrow) {
        return res.status(400).json(errorResponse('Book was not borrowed by this member'));
    }

    const borrowedDays = Math.floor((new Date() - new Date(borrow.borrow_date)) / (1000 * 60 * 60 * 24));
    if (borrowedDays > 1) {
        const penaltyEnd = new Date();
        penaltyEnd.setDate(penaltyEnd.getDate() + 3); 
        await penaltyModel.addPenalty(memberCode, new Date(), penaltyEnd);
    }

    await bookModel.updateBookStock(bookCode, book.stock + 1);
    res.status(200).json(successResponse('Book returned successfully'));
};

const getBorrowStats = async (req, res) => {
    try {
     const borrowing = await borrowModel.getBorrowStats();
     res.status(200).json(successResponse(borrowing));
    } catch (error) {
     res.status(500).json(errorResponse('Error Get borrowing', error));
    }
 };

module.exports = { borrowBook, returnBook, getBorrowStats };
