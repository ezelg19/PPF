const { Router } = require('express')
const productos = require('../class/productos.js')

const router = Router()

router.get('/', async (req, res) => {
    res.render('lista', {
        productsExist: await productos.getAll().length,
        products: await productos.getAll()
    })
})

router.post("/", async (req, res) => {
    try {
        const { nombre, precio } = req.body
        await productos.save({ nombre: nombre, precio: precio })
        res.status(201).redirect('./')
    }
    catch (error) { res.status(400).send({ msg: "Error al cargar el producto", err: error }) }
})

router.get("/:id", async (req, res) => {
    const { id } = req.params
    res.render('producto', {
        productsExist: await productos.getById(parseInt(id)),
        products: await productos.getById(parseInt(id))
    })
})

router.put("/:id", async (req, res) => {
    const { id } = req.params
    const guardado = { title: req.body.title, price: req.body.price, thumbnail: req.body.thumbnail, id: parseInt(id) }
    await productos.actualizar(guardado)
})

router.delete("/:id", async (req, res) => {
    const { id } = req.params
    await productos.deleteById(parseInt(id))
})

module.exports = router