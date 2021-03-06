const Sequelize = require('sequelize')
const db = new Sequelize('postgres://localhost:5432/augMenu2', { logging: false });




const Food = db.define('food', {

    name: {
        type: Sequelize.STRING,
        allowNull: false,
        validation: {
            notEmpty: true
        }
    },
    image: {
        type: Sequelize.STRING
    },

    textureURL: {
        type: Sequelize.STRING
    },

    materialURL : {
        type: Sequelize.STRING
    }
})


module.exports = { db, Food }  