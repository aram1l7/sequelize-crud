const express = require("express");
const router = express.Router();

const seasonController = require("../controllers/seasonController");
/**
 * @swagger
 * components:
 *   schemas:
 *     Season:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - movie_id
 *       properties:
 *         id:
 *           type: number
 *           description: The auto-generated id of the season
 *         title:
 *           type: string
 *           description: The name of the season
 *         description:
 *           type: string
 *           description: The description of the season
 *         movie_id:
 *           type: number
 *           description: The id of the movie which has the current season
 *       example:
 *         title: Season 1:The beginning
 *         description: In this season everything opens up and becomes interesting
 *         movie_id: 4
 *
 */

/**
 * @swagger
 * /api/seasons:
 *   get:
 *     summary: Returns the list of all the seasons
 *     tags: [Season]
 *     responses:
 *       200:
 *         description: The list of the seasons
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Season'
 */

router.get("/", seasonController.getAll);

/**
 * @swagger
 * /api/seasons/{movieId}:
 *   post:
 *     summary: Create a season
 *     tags: [Season]
 *     parameters:
 *       - in: path
 *         name: movieId
 *         schema:
 *           type: string
 *         required: true
 *         description: The movie id
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                title:
 *                  type: string
 *                  description: The season's name.
 *                  example: Season 22:The end
 *                description:
 *                  type: string
 *                  description: The season's description.
 *                  example: Lorem ipsum dolor sit amet
 *
 *     responses:
 *       200:
 *         description: Successfully created a season
 *       500:
 *         description: Internal server error
 */

router.post("/:movieId", seasonController.create);

/**
 * @swagger
 * /api/seasons/{id}:
 *   get:
 *     summary: Get the season by id
 *     tags: [Season]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The season id
 *     responses:
 *       200:
 *         description: Get season info by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Season'
 *       404:
 *         description: The season was not found
 */
router.get("/:id", seasonController.show);

/**
 * @swagger
 * /api/seasons/{id}:
 *  put:
 *    summary: Update the season by id
 *    tags: [Season]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The season id
 *    requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The season's name.
 *                 example: Season 22:The end
 *               description:
 *                 type: string
 *                 description: The season's description.
 *                 example: Lorem ipsum dolor sit amet
 *    responses:
 *      200:
 *        description: The season data was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Season'
 *      404:
 *        description: The season was not found
 *      500:
 *        description: Internal server error
 */
router.put("/:id", seasonController.update);

/**
 * @swagger
 * /api/seasons/{id}:
 *   delete:
 *     summary: Remove the season by id
 *     tags: [Season]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The season id
 *     responses:
 *       200:
 *         description: The season was deleted
 *       404:
 *         description: The season was not found
 */
router.delete("/:id", seasonController.destroy);

module.exports = router;
