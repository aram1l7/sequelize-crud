const express = require("express");
const router = express.Router();
const episodeController = require("../controllers/episodeController");

router.get("/", episodeController.getAll);
router.post("/:seasonId", episodeController.create);
router.get("/:id", episodeController.show);
router.put("/:id", episodeController.update);
router.delete("/:id", episodeController.destroy);

module.exports = router;
