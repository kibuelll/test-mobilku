if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require('express')
const cors = require('cors')
const app = express()
const port = 3000 || process.env.PORT


app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json())


app.listen(port , () => {
  console.log(`app launching on: ${port}`)
})