const { Router } = require('express')
const Productos = require('../class/productos.js')

const router = Router()

const producto = Productos
const admin = true

router.get('/:id?', async (req, res) => {
    const id = parseInt(req.params.id)
    if (id) {
        res.render('index',{
            productosExist: await producto.getById(id),
            productos: await producto.getById(id)
            })
    } else {
        res.render('index',{
            productosExist: await producto.getAll(),
            productos: await producto.getAll()
        })
    }
})

router.post('/', async (req, res) => {
    if (admin) {
        const { nombre, descripcion, codigo, img, precio, stock } = req.body
        timestamp = new Date().toLocaleString()
        const controlador = await producto.save({ timestamp: timestamp, nombre: nombre, descripcion: descripcion, codigo: codigo, img: 'https://cdn.icon-icons.com/icons2/2596/PNG/512/ad_product_icon_155850.png', precio: '$' + precio, stock: parseInt(stock) })
        // if(controlador){res.status(400).send(controlador)}
        res.status(200).send('id: '+controlador)
    } else { res.status(500).send({ error: -1, descripcion: 'ruta "/appi/productos" metodo POST no autorizado' }) }
})

router.put('/:id', async (req, res) => {
    if (admin) {
        const id = parseInt(req.params.id)
        const { nombre, descripcion, codigo, img, precio, stock } = req.body
        timestamp = new Date().toLocaleString()
        const controlador = await producto.actualizar({ id:id, timestamp:timestamp, nombre:nombre, descripcion:descripcion, codigo:codigo, img:'https://cdn.icon-icons.com/icons2/2596/PNG/512/ad_product_icon_155850.png', precio:'$'+precio, stock: parseInt(stock) })
        if(controlador){res.status(400).send(controlador)}
        else{res.sendStatus(200)}
    } else { res.status(500).send({ error: -1, descripcion: 'ruta "/appi/productos/:id" metodo PUT no autorizado' }) }
})

router.delete('/:id', async(req, res) => {
    if (admin) {
        const id = parseInt(req.params.id)
        const controlador = await producto.deleteById(id)
        if(controlador){res.status(400).send(controlador)}
        else{res.sendStatus(200)}
    } else { res.status(500).send({ error: -1, descripcion: 'ruta "/appi/productos/:id" metodo DELETE no autorizado' }) }
})

module.exports = router
