const {db, DataTypes, Model} = require('./db');

class Users extends Model {}
class Shows extends Model {}


Users.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING
},{
    sequelize: db
})

Shows.init({
    title: DataTypes.STRING,
    genre: DataTypes.STRING,
    rating: DataTypes.INTEGER,
    status: DataTypes.STRING
},{
    sequelize: db
})


Shows.belongsTo(Users)
Users.hasMany(Shows)


module.exports = {Users, Shows};