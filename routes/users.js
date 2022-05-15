const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");

router.get("/", userController.getAll);
router.post("/", userController.create);
router.get("/:id", userController.show);
router.put("/:id", userController.update);
router.delete("/:id", userController.destroy);
router.post("/:userId/movies/:movieId", userController.subscribeToMovie);

module.exports = router;
