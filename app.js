if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require('express')
const cors = require('cors')
const app = express()
const port = 3000 || process.env.PORT
const routes = require("./routes")


app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.use(routes)


app.listen(port , () => {
  console.log(`app launching on: ${port}`)
})