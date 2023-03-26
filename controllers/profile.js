const { Profile, sequelize } = require("../models");
const sharp = require("sharp");

class ProfileController {
  static async getAllProfile(req, res, next) {
    try {
      const profiles = await Profile.findAll();
      res.status(200).json(profiles);
    } catch (error) {
      next(error);
    }
  }

  static async getOneProfile(req, res, next) {
    try {
      const { id } = req.params;
      const profile = await Profile.findByPk(id);

      if (!profile) {
        throw {
          name: "Not Found",
        };
      }

      res.status(200).json(profile);
    } catch (error) {
      next(error);
    }
  }

  static async createProfile(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const { name, birthDate, phone, cityOrigin, highestEducation, picture } = req.body;
      const picturePng = await sharp(picture).resize(500, 500).png().toBuffer();

      if(!picturePng) {
        throw {
          name : "Invalid picture"
        }
      }

      const newProfile = await Profile.create({
        name,
        birthDate,
        phone,
        cityOrigin,
        highestEducation,
        picture : picturePng.toString()
      });

      console.log(picturePng, "fileupload");
      console.log(newProfile, "uploaded new data");

      await t.commit()
      res.status(201).json(newProfile);
    } catch (error) {
      console.log(error);
      await t.rollback();
      next(error);
    }
  }

  static async updateProfile(req, res,next) {
    const t = await sequelize.transaction();
    try {
      const { name, birthDate, phone, cityOrigin, highestEducation, picture } = req.body;
      const {id} = req.params;
      const profile = await Profile.findByPk(id);
      const picturePng = await sharp(picture).resize(500, 500).png().toBuffer();

      if(!profile) {
        throw {
          name : "Not Found"
        }
      }

      console.log(picturePng, "file")
      
      const updated = await Profile.update({
        name, birthDate, phone, cityOrigin, highestEducation, picture : picturePng
      },{
        returning : true
      })

      console.log(updated)
      res.status(200).json({message: "Profile updated"})
    } catch (error) {
      console.log(error);
      await t.rollback();
      next(error)
    }
  }
}

module.exports = ProfileController;
