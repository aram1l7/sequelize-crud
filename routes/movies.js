const express = require("express");
const router = express.Router();
const movieController = require("../controllers/movieController");

router.get("/", movieController.getAll);
router.post("/", movieController.create);
router.get("/:id", movieController.show);
router.put("/:id", movieController.update);
router.delete("/:id", movieController.destroy);

module.exports = router;
