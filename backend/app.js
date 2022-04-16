import express from "express"
import bodyParser from "body-parser"
import mongoose from "mongoose"
import cors from "cors"
import postRoutes from "./routes/posts.js"
import userRouter from "./routes/user.js"
const app = express()

const port = process.env.PORT || 5000

app.use(bodyParser.json({ limit: "30mb", extended: true }))
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }))
app.use(cors())
app.use("/posts", postRoutes)
app.use("/user", userRouter)
app.get("/", (req, res) => {
  res.send("hello!")
})

// process.env.CONNECTION_URL

mongoose
  .connect("mongodb://localhost:27017/Destination", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(port, () => console.log(`Server Running on Port: ${port}`))
  )
  .catch((error) => console.log(`${error} did not connect`))
