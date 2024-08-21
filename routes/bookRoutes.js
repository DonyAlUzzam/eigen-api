const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');


/**
 * @swagger
 * /books:
 *   get:
 *     summary: Get all books
 *     responses:
 *       200:
 *         description: A list of books
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       code:
 *                         type: string
 *                       title:
 *                         type: string
 *                       author:
 *                         type: string
 *                       stock:
 *                         type: integer
 */
router.get('/', bookController.getBooks);

/**
 * @swagger
 * /books/{code}:
 *   get:
 *     summary: Get book by code
 *     parameters:
 *       - in: path
 *         name: code
 *         required: true
 *         description: The code of the book
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of books
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       code:
 *                         type: string
 *                       title:
 *                         type: string
 *                       author:
 *                         type: string
 *                       stock:
 *                         type: integer
 *
 *       404:
 *         description: Book not found
 */
router.get('/:code', bookController.getBook);

module.exports = router;
