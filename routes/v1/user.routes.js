const express = require('express');
const router = express.Router();

const userController = require("../../controllers/user.controller")

router.get("/random",userController.getRandomUser)
router.get("/all",userController.getAllUser)
router.post("/save",userController.saveUser)
router.patch("/update/:id",userController.updateOne)
router.patch("/bulk-update",userController.updateMany)
router.delete("/delete/:id",userController.deleteOne)

module.exports = router;