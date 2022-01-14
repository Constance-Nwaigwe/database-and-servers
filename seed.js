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

    const user1 = await Users.findByPk(1);
    const show1 = await Shows.findByPk(1)
    await user1.addShow(show1)

    const user2 = await Users.findByPk(2);
    const show2 = await Shows.findByPk(2)
    await user2.addShow(show2)

    const user3 = await Users.findByPk(3);
    const show3 = await Shows.findByPk(3)
    await user3.addShow(show3)

    const user4 = await Users.findByPk(4);
    const show4 = await Shows.findByPk(4)
    await user4.addShow(show4)

    const user5 = await Users.findByPk(5);
    const show5 = await Shows.findByPk(5)
    await user5.addShow(show5)

    const user6 = await Users.findByPk(6);
    const show6 = await Shows.findByPk(6)
    await user6.addShow(show6)

    const user7 = await Users.findByPk(7);
    const show7 = await Shows.findByPk(7)
    await user7.addShow(show7)

    const user8 = await Users.findByPk(8);
    const show8 = await Shows.findByPk(8)
    await user8.addShow(show8)

    const user9 = await Users.findByPk(9);
    const show9 = await Shows.findByPk(9)
    await user9.addShow(show9)

    const user10 = await Users.findByPk(10);
    const show10= await Shows.findByPk(10)
    await user10.addShow(show10)

    console.log("success"); 
}

//seed();

module.exports = seed;