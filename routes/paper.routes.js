const express = require("express");
const { createPaper, getPapers, showPaper, updatePaper, deletePaper } = require("../controllers/paper.controller");
const auth = require("../middleware/auth");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Papers
 *   description: API for managing papers
 */

/**
 * @swagger
 * /api/papers:
 *   post:
 *     summary: Create a new paper
 *     tags: [Papers]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "My Research Paper"
 *               content:
 *                 type: string
 *                 example: "This is the content of the paper."
 *               author:
 *                 type: string
 *                 example: "641e6d5f334b8b00278e3d45"
 *     responses:
 *       201:
 *         description: Paper created successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
router.post("/", auth, createPaper);

/**
 * @swagger
 * /api/papers:
 *   get:
 *     summary: Retrieve a list of papers
 *     tags: [Papers]
 *     responses:
 *       200:
 *         description: List of papers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: "641e6d5f334b8b00278e3d45"
 *                   title:
 *                     type: string
 *                     example: "My Research Paper"
 *                   content:
 *                     type: string
 *                     example: "This is the content of the paper."
 *                   author:
 *                     type: string
 *                     example: "641e6d5f334b8b00278e3d45"
 */
router.get("/", getPapers);

/**
 * @swagger
 * /api/papers/{id}:
 *   get:
 *     summary: Get a single paper by ID
 *     description: Retrieve a single paper by its unique identifier. The response includes the author details.
 *     tags:
 *       - Papers
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The unique identifier of the paper
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully fetched the paper
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: Paper fetched successfully
 *                 body:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: 63f51a8e9e4e8c001c4b1234
 *                     title:
 *                       type: string
 *                       example: Example Paper
 *                     content:
 *                       type: string
 *                       example: This is the content of the paper.
 *                     author:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                           example: 63f51a8e9e4e8c001c4b5678
 *                         name:
 *                           type: string
 *                           example: John Doe
 *                         email:
 *                           type: string
 *                           example: johndoe@example.com
 *       404:
 *         description: Paper not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                   example: 404
 *                 message:
 *                   type: string
 *                   example: Paper not found
 *                 body:
 *                   type: array
 *                   items:
 *                     type: string
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: Error fetching paper
 *                 body:
 *                   type: object
 *                   properties:
 *                     error:
 *                       type: string
 *                       example: Detailed server error message here
 */
router.get("/:id", showPaper);


/**
 * @swagger
 * /api/papers/{id}:
 *   put:
 *     summary: Update a paper by ID
 *     tags: [Papers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: "641e6d5f334b8b00278e3d45"
 *         description: The paper ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Updated Research Paper"
 *               content:
 *                 type: string
 *                 example: "Updated content of the paper."
 *     responses:
 *       200:
 *         description: Paper updated successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Paper not found
 */
router.put("/:id", auth, updatePaper);

/**
 * @swagger
 * /api/papers/{id}:
 *   delete:
 *     summary: Delete a paper by ID
 *     tags: [Papers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: "641e6d5f334b8b00278e3d45"
 *         description: The paper ID
 *     responses:
 *       200:
 *         description: Paper deleted successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Paper not found
 */
router.delete("/:id", auth, deletePaper);

module.exports = router;
