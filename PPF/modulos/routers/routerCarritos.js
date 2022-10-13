const { Router } = require('express')
const Carritos = require('../class/carritos.js')
const Productos = require('../class/productos.js')

const router = Router()
const productos = Productos
const carritos = Carritos
const admin = true

router.post('/', async (req, res) => {
    if (admin) {
        timestamp = new Date().toLocaleString()
        const id = await carritos.save({ timestamp: timestamp, productos: [] })
        res.status(200).send('id: ' + id)
    } else { res.status(500).send({ error: -1, descripcion: 'ruta "/appi/carritos/" metodo POST no autorizada' }) }
})

router.delete('/:id', async (req, res) => {
    if (admin) {
        const id = parseInt(req.params.id)
        const controlador = await carritos.deleteById(id)
        if (controlador) { res.status(400).send(controlador) }
        else { res.sendStatus(200) }
    } else { res.status(500).send({ error: -1, descripcion: 'ruta "/appi/carritos/" metodo DELETE no autorizada' }) }
})

router.get('/:id/productos', async (req, res) => {
    const id = parseInt(req.params.id)
    const controlador = await carritos.getProductos(id)
    if (controlador.error) { res.status(400).send(controlador) }
    else { res.status(200).send(controlador) }
})

router.post('/:id/productos', async (req, res) => {
    const id = parseInt(req.params.id)
    const productoAAgregar = await productos.getById(parseInt(req.body.idProducto))
    if (productoAAgregar.error) { res.status(400).send(productoAAgregar) }
    else {
        const controlador = await carritos.newProducto(productoAAgregar, id)
        if (controlador.error) { res.status(400).send(controlador) }
        else { res.status(200).redirect('/appi/productos')}
    }
})

router.delete('/:id/productos/:id_producto', async (req, res) => {
    const id = parseInt(req.params.id)
    const id_productos = parseInt(req.params.id_producto)
    const controlador = await carritos.deleteProductoById(id, id_productos)
    if (controlador.error) { res.status(400).send(controlador) }
    else { res.sendStatus(200) }
})


module.exports = router
