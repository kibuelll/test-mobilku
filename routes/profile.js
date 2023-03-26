const router = require("express").Router()
const ProfileController = require("../controllers/profile")

router.get("/", ProfileController.getAllProfile)
router.get("/:id", ProfileController.getOneProfile)
router.post("/", ProfileController.createProfile)
router.put("/:id", ProfileController.updateProfile)

module.exports = router