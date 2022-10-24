const express = require('express')
const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')

const router = require('./modulos/routers/routerProductos.js')
const productos = require('./modulos/class/productos.js')
const mensajes = require('./modulos/class/mensajes.js')
const hbs = require('express-handlebars')

const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)


app.engine('hbs', hbs.engine({
    extname: '.hbs',
    partialsDir: __dirname + '/views/partials',
    layoutsDir: __dirname + '/views/layouts',
    defaultLayout: 'server.hbs'
}))

app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.set('views', './views')
app.set('view engine', 'hbs')

app.get('/', (req, res) => {
    res.render('main', { root: __dirname })
})

app.use('/productos', router)
let users = 0

const PORT = 4000
httpServer.listen(PORT, () => { console.log(`escuchando ${PORT}`) })
// httpServer.listen(process.env.PORT || 8080, () => console.log(`escuchando ${PORT}`))
io.on('connection', async (socket) => {
    users++
    console.log(`usuario ${socket.id} conectado. N°:${users}`)
    socket.on('respuesta', async () => {
        io.sockets.emit('array', await productos.getAll())
        io.sockets.emit('mensajes', await mensajes.getAll())
    })
    socket.on('newProduct', async data => {
        productos.save(data)
        io.sockets.emit('array', await productos.getAll())
    })
    socket.on('newMensaje', async data => {
        mensajes.save(data)
        io.sockets.emit('mensajes', await mensajes.getAll())
    })
    socket.on('disconnect', () => { console.log('user disconnected'), users-- })
})