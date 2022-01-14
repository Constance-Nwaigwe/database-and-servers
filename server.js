const express = require('express');
const app = express();
const port = 5000;
const {Users, Shows} = require('./classes');
const seed = require('./seed')

app.use(express.json())

app.get('/', async (req, res) => {
	res.send('<h1>Wekcome to Watchlist</h1>')
})

//get all users
app.get('/users', async (req, res) => {
    const users = await Users.findAll()
	res.json({users})
})
//get user by id
app.get('/users/:id', async (req, res) => {
    const user = await Users.findByPk(req.params.id, {include: Shows})
	res.json({user})
})
//get all shows
app.get('/shows', async (req, res) => {
    const shows = await Shows.findAll()
	res.json({shows})
})
//get show by id
app.get('/shows/:id', async (req, res) => {
    const show = await Shows.findByPk(req.params.id)
	res.json({show})
})
//get user's shows
app.get('/users/:id/shows', async (req, res) => {
    const user = await Users.findByPk(req.params.id, {include: Shows})
	res.json(user.Shows)
})
//get shows by genre
app.get('/:genre', async (req, res) => {
    const shows = await Shows.findAll({where: {genre: req.params.genre}})
	res.json({shows})
})
//post a new users
app.post('/users-update', async (req, res) => {
    const newuser = await Users.create(req.body)
	res.json({newuser})
})
//post a new show
app.post('/shows-update', async (req, res) => {
    const newshow = await Shows.create(req.body)
	res.json({newshow})
})

//update show
app.put('/shows/:id', async (req, res) => {
    const show = await Shows.update(req.body, {where: {id: req.params.id}})
	res.json({show})
})
//update user info
app.put('/users/:id', async (req, res) => {
    const user = await Users.update(req.body, {where: {id: req.params.id}})
	res.json({user})
})
app.put('/users/:userid/shows/:showid', async (req, res) => {
    await Shows.update({Userid: req.params.userid}, 
        {
            where:{id: req.params.showid}
    })
        
    
    res.send("Updated!")
})

//Delete show
app.delete('/shows/:id', async (req, res) => {
    await Shows.destroy({where: {id: req.params.id}})
	res.json({message: "Show deleted"})
})
//Delete user
app.delete('/shows/:id', async (req, res) => {
    await Users.destroy({where: {id: req.params.id}})
	res.json({message: "Show deleted"})
})

//app listening
app.listen(port, async() => {
    await seed()
    console.log(`Server is listening on http://localhost:${port}`)
})

