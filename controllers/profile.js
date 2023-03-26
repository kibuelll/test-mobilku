const { Profile, sequelize, PictureProfile } = require("../models");
const sharp = require("sharp");
const admin = require("firebase-admin");
const serviceAccount = require("../test-mobilku-firebase-adminsdk-g8n8i-8633b8f44f.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "test-mobilku.appspot.com",
});
class ProfileController {
  static async getAllProfile(req, res, next) {
    try {
      const profiles = await Profile.findAll({
        include: {
          model: PictureProfile,
        },
      });
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
      const { name, birthDate, phone, cityOrigin, highestEducation } = req.body;
      const picture500 = await sharp(req.file.buffer).resize(500).toBuffer();
      const picture1000 = await sharp(req.file.buffer).resize(1000).toBuffer();

      const bucket = admin.storage().bucket();
      const file500 = bucket.file(`images/${req.file.originalname}-500px.jpg`);
      const file1000 = bucket.file(
        `images/${req.file.originalname}-1000px.jpg`
      );

      await Promise.all([
        file500.save(picture500, { contentType: "image/jpeg" }),
        file1000.save(picture1000, { contentType: "image/jpeg" }),
      ]);

      const [url500, url1000] = await Promise.all([
        file500.getSignedUrl({
          action: "read",
          expires: "03-17-2024",
        }),
        file1000.getSignedUrl({
          action: "read",
          expires: "03-17-2024",
        }),
      ]);

      const newProfile = await Profile.create({
        name,
        birthDate,
        phone,
        cityOrigin,
        highestEducation,
      });

      await PictureProfile.create({
        ProfileId: newProfile.dataValues.id,
        source500: url500[0],
        source1000: url1000[0],
      });

      console.log(newProfile, "uploaded new data");

      await t.commit();
      res.status(201).json(newProfile);
    } catch (error) {
      console.log(error);
      await t.rollback();
      next(error);
    }
  }

  static async updateProfile(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const { name, birthDate, phone, cityOrigin, highestEducation } = req.body;
      const { id } = req.params;
      const profile = await Profile.findByPk(id);

      if (!profile) {
        throw {
          name: "Not Found",
        };
      }

      const updated = await Profile.update(
        {
          name,
          birthDate,
          phone,
          cityOrigin,
          highestEducation,
        },
        {
          where: {
            id,
          },
          returning: true,
        }
      );

      await PictureProfile.destroy({
        where : {
          ProfileId : id
        }
      })

      const picture500 = await sharp(req.file.buffer).resize(500).toBuffer();
      const picture1000 = await sharp(req.file.buffer).resize(1000).toBuffer();

      const bucket = admin.storage().bucket();
      const file500 = bucket.file(`images/${req.file.originalname}-500px.jpg`);
      const file1000 = bucket.file(
        `images/${req.file.originalname}-1000px.jpg`
      );

      await Promise.all([
        file500.save(picture500, { contentType: "image/jpeg" }),
        file1000.save(picture1000, { contentType: "image/jpeg" }),
      ]);

      const [url500, url1000] = await Promise.all([
        file500.getSignedUrl({
          action: "read",
          expires: "03-17-2024",
        }),
        file1000.getSignedUrl({
          action: "read",
          expires: "03-17-2024",
        }),
      ]);

      await PictureProfile.create({
        ProfileId: updated[1][0].dataValues.id,
        source500: url500[0],
        source1000: url1000[0],
      })

      res.status(200).json({ message: "Profile updated" });
    } catch (error) {
      console.log(error);
      await t.rollback();
      next(error);
    }
  }
}

module.exports = ProfileController;
