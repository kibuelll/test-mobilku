'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PictureProfile extends Model {
    static associate(models) {
      PictureProfile.belongsTo(models.Profile)
    }
  }
  PictureProfile.init({
    ProfileId: DataTypes.INTEGER,
    source500: DataTypes.STRING,
    source1000: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'PictureProfile',
  });
  return PictureProfile;
};