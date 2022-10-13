const express = require('express')
// const { Server: HttpServer } = require('https')
// const { Server: IOServer } =require('socket.io')

const routerProductos = require('./modulos/routers/routerProductos.js')
const routerCarritos = require('./modulos/routers/routerCarritos.js')

const app = express()
// const http = new HttpServer(app)
// const io = new IOServer(http)


app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.set('views','./views')
app.set('view engine','')

app.use('/appi/productos', routerProductos)
app.use('/appi/carritos', routerCarritos)

const PORT = 8080
app.listen(PORT, () => { console.log(`escuchando ${PORT}`) } )
// app.listen(process.env.PORT || 8080,()=>console.log(`escuchando ${PORT}`))

