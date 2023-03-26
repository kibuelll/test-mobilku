const router = require("express").Router();
const ProfileController = require("../controllers/profile");
const fileUpload = require("../middlewares/multer");

router.get("/", ProfileController.getAllProfile);
router.get("/:id", ProfileController.getOneProfile);
router.post("/", fileUpload.single("picture"), ProfileController.createProfile);
router.put(
  "/:id",
  fileUpload.single("picture"),
  ProfileController.updateProfile
);

module.exports = router;
