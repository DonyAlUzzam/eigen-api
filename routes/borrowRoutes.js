const express = require('express');
const router = express.Router();
const borrowController = require('../controllers/borrowController');

/**
 * @swagger
 * /borrows/borrow:
 *   post:
 *     summary: Borrow a book
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               memberCode:
 *                 type: string
 *               bookCode:
 *                 type: string
 *     responses:
 *       200:
 *         description: Book borrowed successfully
 *       400:
 *         description: Error if book is not available or member is penalized
 */
router.post('/borrow', borrowController.borrowBook);

/**
 * @swagger
 * /borrows/return:
 *   post:
 *     summary: Return a borrowed book
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               memberCode:
 *                 type: string
 *               bookCode:
 *                 type: string
 *     responses:
 *       200:
 *         description: Book returned successfully
 *       400:
 *         description: Error if book was not borrowed by the member
 */
router.post('/return', borrowController.returnBook);

/**
 * @swagger
 * /borrows/:
 *   get:
 *     summary: Get the number of books borrowed by each member
 *     responses:
 *       200:
 *         description: A list of members and the number of books they have borrowed
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
 *                       memberCode:
 *                         type: string
 *                       name:
 *                         type: string
 *                       borrowedBooksCount:
 *                         type: integer
 */
router.get('/', borrowController.getBorrowStats);

module.exports = router;
