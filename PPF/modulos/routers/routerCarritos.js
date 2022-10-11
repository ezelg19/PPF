import { Router } from 'express'
const Carritos = require('../class/carritos.js')
const Productos = require('../class/productos.js')

const router = Router()
const productos = Productos
const carritos = Carritos
const admin = true

router.post('/', async (req, res) => {
    if (admin) {
        timestamp = new Date().toDateString
        res.send(await carritos.save({ timestamp: timestamp, productos: [] }))
    } else { res.send = { error: -1, descripcion: 'ruta "/appi/carritos/" metodo POST no autorizada' } }
})

router.delete('/:id', async (req, res) => {
    if (admin) {
        const { id } = req.params
        await carritos.deleteById(id)
    } else { res.send({ error: -1, descripcion: 'ruta "/appi/carritos/" metodo DELETE no autorizada' }) }
})

router.get('/:id/productos', async (req, res) => {
    const { id } = req.params
    res.send(await carritos.getProductos(id))
})

router.post('/:id/productos', async (req, res) => {
    const { id } = req.params
    carritos.newProducto(productos.getById(parseInt(req.body.idProducto)), id)
})

router.delete('/:id/producto/:id_producto', (req, res) => {
    const {id,id_productos} = req.params
    carritos.deleteProductoById(id,id_productos)
})


module.exports = router
