const express = require("express");
const router = express.Router();

const seasonController = require("../controllers/seasonController");

router.get("/", seasonController.getAll);
router.post("/:movieId", seasonController.create);
router.get("/:id", seasonController.show);
router.put("/:id", seasonController.update);
router.delete("/:id", seasonController.destroy);

module.exports = router;
