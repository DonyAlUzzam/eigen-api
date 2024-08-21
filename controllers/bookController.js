const bookModel = require('../models/bookModel');
const { successResponse, errorResponse } = require('../response/response');

const getBooks = async (req, res) => {
   try {
    const books = await bookModel.getAllBooks();
    res.status(200).json(successResponse(books));
   } catch (error) {
    res.status(500).json(errorResponse('Error Get books', error));
   }
};

const getBook = async (req, res) => {
    const book = await bookModel.getBookByCode(req.params.code);
    if (book) {
        res.status(200).json(successResponse(book));
    } else {
        res.status(404).json(errorResponse('Book not found'));
    }
};

module.exports = { getBooks, getBook };
