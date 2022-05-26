const express = require("express");
const router = express.Router();
const movieController = require("../controllers/movieController");
/**
 * @swagger
 * components:
 *   schemas:
 *     Movie:
 *       type: object
 *       required:
 *         - title
 *         - description
 *       properties:
 *         id:
 *           type: number
 *           description: The auto-generated id of the movie
 *         title:
 *           type: string
 *           description: The name of the movie
 *         description:
 *           type: string
 *           description: The description of the movie
 *       example:
 *         title: Harry Poter
 *         description: Interesting series about Harry Poter
 */

/**
 * @swagger
 * /api/movies:
 *   get:
 *     summary: Returns the list of all the movies
 *     tags: [Movie]
 *     responses:
 *       200:
 *         description: The list of the movies
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Movie'
 */

router.get("/", movieController.getAll);

/**
 * @swagger
 * /api/movies:
 *   post:
 *     summary: Create a new movie
 *     tags: [Movie]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Movie'
 *     responses:
 *       200:
 *         description: The movie was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Movie'
 *       500:
 *         description: Internal server error
 */

router.post("/", movieController.create);

/**
 * @swagger
 * /api/movies/{id}:
 *   get:
 *     summary: Get the movie by id
 *     tags: [Movie]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The movie id
 *     responses:
 *       200:
 *         description: Get movie info by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Movie'
 *       404:
 *         description: The movie was not found
 */
router.get("/:id", movieController.show);
/**
 * @swagger
 * /api/movies/{id}:
 *  put:
 *    summary: Update the movie by id
 *    tags: [Movie]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The movie id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Movie'
 *    responses:
 *      200:
 *        description: The movie data was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Movie'
 *      404:
 *        description: The movie was not found
 *      500:
 *        description: Internal server error
 */
router.put("/:id", movieController.update);
/**
 * @swagger
 * /api/movies/{id}:
 *   delete:
 *     summary: Remove the movie by id
 *     tags: [Movie]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The movie id
 *     responses:
 *       200:
 *         description: The movie was deleted
 *       404:
 *         description: The movie was not found
 */
router.delete("/:id", movieController.destroy);

module.exports = router;
