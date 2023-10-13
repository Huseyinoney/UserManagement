const express = require("express")
const router = express.Router()
const {getAllUser,deleteUser,updateUser} = require("../controllers/userController")
const {authenticateToken} = require("../middleware/authMiddleware")


router.get("/getAllUser",authenticateToken,getAllUser)
router.delete("/deleteUser/:id",authenticateToken,deleteUser)
router.put("/updateUser/:id",authenticateToken,updateUser)

module.exports = router