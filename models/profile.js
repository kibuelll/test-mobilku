'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    static associate(models) {
      // define association here
    }
  }
  Profile.init({
    name: DataTypes.STRING,
    age: DataTypes.INTEGER,
    birthDate: DataTypes.DATE,
    phone: DataTypes.STRING,
    cityOrigin: DataTypes.STRING,
    highestEducation: DataTypes.STRING,
    picture : DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Profile',
    hooks : {
      beforeCreate(profile) {
        profile.age = new Date ().getFullYear() - new Date(profile.birthDate).getFullYear()
      }
    }
  });
  return Profile;
};