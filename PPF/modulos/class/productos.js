// import { fs } from 'fs'
const fs = require('fs')

class Productos {
    constructor(ruta, id = 1) {
        this.rutaProductos = ruta
        this.id = id
    }

    async save(obj, newProduct = true) {
        const contArchivo = await this.getAll()
        // Verifico si se quiere ingresar un producto nuevo o actualizar uno existente
        if (newProduct) {
            if (contArchivo.length !== 0) {
                this.id++
                await fs.promises.writeFile(this.rutaProductos, JSON.stringify([...contArchivo, { ...obj, id: this.id }], null, 2), 'utf-8')
            } else {
                await fs.promises.writeFile(this.rutaProductos, JSON.stringify([{ ...obj, id: this.id }]), 'utf-8')
            }
            return this.id
        } else { await fs.promises.writeFile(this.rutaProductos, JSON.stringify([...contArchivo, { ...obj }], null, 2), 'utf-8') }
    }

    async actualizar(obj) {
        const contArchivo = await this.getAll()
        const product = contArchivo.filter(item => item.id === obj.id)
        if (product.length !== 0) {
            await this.deleteById(obj.id)
            await this.save(obj, false)
        } else { return { error: 'Productos.actualizar()', descripcion: 'El id del producto ingresado no existe en la Base de Datos' } }
    }

    async getById(id) {
        const contArchivo = await this.getAll()
        const product = contArchivo.filter(item => item.id === id)
        if (product.length !== 0) { return product }
        else { return { error: 'Productos.getById()', descripcion: 'El id del producto ingresado no existe en la Base de Datos' } }
    }

    async getAll() {
        try {
            let contenido = await fs.promises.readFile(this.rutaProductos, 'utf-8')
            let contParse = await JSON.parse(contenido)
            // Localizo el producto con el Id mas alto para tener referencia de Ids para nuevos productos
            if (contParse.length !== 0) { contParse.map(elem => { if (elem.id > this.id) { this.id = elem.id } }) }
            return contParse
        } catch (error) {
            console.error('Error leer archivo: ' + error)
        }
    }

    async deleteById(id) {
        const contArchivo = await this.getAll()
        const productoABorrar = contArchivo.filter(item => item.id === id)
        if (productoABorrar.length !== 0) {
            const productoBorrado = contArchivo.filter(item => item.id !== id)
            await fs.promises.writeFile(this.rutaProductos, JSON.stringify(productoBorrado, null, 2))
        } else { return { error: 'Productos.deleteById()', descripcion: 'El id del producto no se encontro en la Base de Batos' } }
    }

    async deleteAll() {
        await fs.promises.writeFile(this.rutaProductos, JSON.stringify([], null, 2), 'utf-8')
    }
}

const productos = new Productos('./modulos/fileSistem/productos.json')
module.exports = productos
