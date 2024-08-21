const express = require('express');
const router = express.Router();
const memberController = require('../controllers/memberController');

/**
 * @swagger
 * /members:
 *   get:
 *     summary: Get all members
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
router.get('/', memberController.getMembers);

module.exports = router;
