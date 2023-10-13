const express = require("express")
const router = express.Router()
const {login,register, logOut} = require("../controllers/authController")
const {authenticateToken} = require("../middleware/authMiddleware")

router.post("/register",register)
router.post("/login",login)
router.post("/logout",authenticateToken,logOut)
module.exports = router