const path = require('path')
const fs = require('fs').promises

const {db} = require('./db')
const {Users, Shows} = require('./classes')

const seed = async () => {
    //
    await db.sync({force: true})

    const userspath = path.join(__dirname, 'data/users.json')
    const showpath = path.join(__dirname, 'data/shows.json')

    const usersbuffer = await fs.readFile(userspath)
    const showsbuffer = await fs.readFile(showpath)

    const {usersdata} = JSON.parse(String(usersbuffer))
    const {showsdata} = JSON.parse(String(showsbuffer))

    const userspromise = usersdata.map(user => Users.create(user))
    const showspromise = showsdata.map(show => Shows.create(show))

    await Promise.all(userspromise)
    await Promise.all(showspromise)

    console.log("success"); 
}

seed();

module.exports = seed;