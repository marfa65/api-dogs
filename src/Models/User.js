const {DataTypes} = require ('sequelize');

module.exports = (sequelize) =>{
    sequelize.define ('user', {
        name: {
            type: DataTypes.STRING,
        },
        lastName: {
            type: DataTypes.STRING
        }
    },
    {
        timestamps: false
    });
};