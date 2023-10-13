const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const database =  require("./config/database")
const authRouter = require("./routes/auth")
const dotenv = require("dotenv")
const app = express()
const userRouter = require("./routes/user")
dotenv.config()

const port = process.env.PORT;

app.use(cors())
app.use(bodyParser.json({limit:"30mb",extended:true}))
app.use(bodyParser.urlencoded({limit:"30mb",extended:true}))
app.use("/",authRouter)
app.use("/",userRouter)
database()

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})