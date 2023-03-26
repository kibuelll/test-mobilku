const router = require("express").Router()
const profileRoutes = require("./profile")

router.use("/profiles",profileRoutes)

module.exports = router

