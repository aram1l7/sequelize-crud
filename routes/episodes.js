const express = require("express");
const router = express.Router();
const episodeController = require("../controllers/episodeController");
/**
 * @swagger
 * components:
 *   schemas:
 *     Episode:
 *       type: object
 *       required:
 *         - title
 *         - about
 *         - season_id
 *       properties:
 *         id:
 *           type: number
 *           description: The auto-generated id of the episode
 *         title:
 *           type: string
 *           description: The name of the episode
 *         about:
 *           type: string
 *           description: The description of the episode
 *         season_id:
 *           type: number
 *           description: The id of the season which has the current episode
 *       example:
 *         title: Episode 22
 *         about: In this episode everything opens up and becomes interesting
 *         season_id: 6
 *
 */

/**
 * @swagger
 * /api/episodes:
 *   get:
 *     summary: Returns the list of all the episodes
 *     tags: [Episode]
 *     responses:
 *       200:
 *         description: The list of the episodes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Episode'
 */

router.get("/", episodeController.getAll);

/**
 * @swagger
 * /api/episodes/{seasonId}:
 *   post:
 *     summary: Create an episode
 *     tags: [Episode]
 *     parameters:
 *       - in: path
 *         name: seasonId
 *         schema:
 *           type: string
 *         required: true
 *         description: The season id
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                title:
 *                  type: string
 *                  description: The episode's name.
 *                  example: Episode 24:The end
 *                about:
 *                  type: string
 *                  description: The episode's description.
 *                  example: Lorem ipsum dolor sit amet
 *
 *     responses:
 *       200:
 *         description: Successfully created an episode
 *       500:
 *         description: Internal server error
 */
router.post("/:seasonId", episodeController.create);

/**
 * @swagger
 * /api/episodes/{id}:
 *   get:
 *     summary: Get the episode by id
 *     tags: [Episode]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The episode id
 *     responses:
 *       200:
 *         description: Get episode info by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Episode'
 *       404:
 *         description: The episode was not found
 */

router.get("/:id", episodeController.show);

/**
 * @swagger
 * /api/episodes/{id}:
 *  put:
 *    summary: Update the episode by id
 *    tags: [Episode]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The episode id
 *    requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The episode's name.
 *                 example: Episode 22:The end
 *               description:
 *                 type: string
 *                 description: The episode's description.
 *                 example: Lorem ipsum dolor sit amet
 *    responses:
 *      200:
 *        description: The episode data was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Episode'
 *      404:
 *        description: The episode was not found
 *      500:
 *        description: Internal server error
 */

router.put("/:id", episodeController.update);

/**
 * @swagger
 * /api/episodes/{id}:
 *   delete:
 *     summary: Remove the episode by id
 *     tags: [Episode]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The episode id
 *     responses:
 *       200:
 *         description: The episode was deleted
 *       404:
 *         description: The episode was not found
 */
router.delete("/:id", episodeController.destroy);

module.exports = router;
