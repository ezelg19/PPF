// import { Productos } from './productos.js'
const fs = require('fs')

class Carritos {
    constructor(ruta, id = 1) {
        this.rutaCarritos = ruta
        this.id = id
    }

    async save(obj, newCarrito = true) {
        const contArchivo = await this.getAll()
        // Verifico si se quiere ingresar un carrito nuevo o actualizar uno existente
        if (newCarrito) {
            if (contArchivo.length !== 0) {
                this.id++
                await fs.promises.writeFile(this.rutaCarritos, JSON.stringify([...contArchivo, { ...obj, id: this.id }], null, 2), 'utf-8')
            } else {
                await fs.promises.writeFile(this.rutaCarritos, JSON.stringify([{ ...obj, id: this.id }]), 'utf-8')
            }
            return this.id
        } else {
            await fs.promises.writeFile(this.rutaCarritos, JSON.stringify([...contArchivo, { ...obj }], null, 2), 'utf-8')
        }
    }

    // async actualizar(obj) {
    //     const contArchivo = await this.getAll()
    //     const carrito = contArchivo.filter(item => item.id === obj.id)
    //     if (carrito.length !== 0) {
    //         await this.deleteById(obj.id)
    //         await this.save(obj, false)
    //     } else { return { error: 'Carritos.actualizar()', descripcion: 'El id del carrito ingresado no existe en la Base de Datos' } }
    // }

    async getById(id) {
        const contArchivo = await this.getAll()
        const carrito = contArchivo.filter(item => item.id === id)
        if (carrito.length !== 0) { return carrito }
        else { return { error: 'Carritos.getById()', descripcion: 'El id del carrito ingresado no existe en la Base de Datos' } }
    }

    async getAll() {
        try {
            let contenido = await fs.promises.readFile(this.rutaCarritos, 'utf-8')
            let contParse = await JSON.parse(contenido)
            // Localizo el carrito con el Id mas alto para tener referencia de Ids para nuevos carritos
            if (contParse.length !== 0) { contParse.map(elem => { if (elem.id > this.id) { this.id = elem.id } }) }
            return contParse
        } catch (error) {
            console.error('Error leer archivo: ' + error)
        }
    }

    async deleteById(id) {
        const contArchivo = await this.getAll()
        const carritoABorrar = contArchivo.filter(item => item.id === id)
        if (carritoABorrar.length !== 0) {
            const carritoBorrado = contArchivo.filter(item => item.id !== id)
            await fs.promises.writeFile(this.rutaCarritos, JSON.stringify(carritoBorrado, null, 2))
        } else { return { error: 'Carritos.deleteById()', descripcion: 'El id del carrito no se encontro en la Base de Batos' } }
    }

    async deleteAll() {
        await fs.promises.writeFile(this.rutaCarritos, JSON.stringify([], null, 2), 'utf-8')
    }

    async newProducto(productoAAgregar, idCarrito) {
        const contArchivo = await this.getAll()
        const carrito = contArchivo.filter(item => item.id === idCarrito)
        if (carrito.length !== 0) {
            carrito[0].productos.push(productoAAgregar[0])
            await this.deleteById(idCarrito)
            await this.save(carrito[0], false)
            return {}
        } else { return { error: 'Carritos.actualizar()', descripcion: 'El id del carrito ingresado no existe en la Base de Datos' } }
    }

    async getProductos(idCarrito) {
        const contArchivo = await this.getAll()
        const carrito = contArchivo.filter(item => item.id === idCarrito)
        if (carrito.length !== 0) {
            return carrito[0].productos
        } else { return { error: 'Carritos.getProductos()', descripcion: 'El id del carrito ingresado no existe en la Base de Datos' } }
    }

    async deleteProductoById(idCarrito, idProducto) {
        const contArchivo = await this.getAll()
        const carrito = contArchivo.filter(item => item.id === idCarrito)
        if (carrito.length !== 0) {
            const productos = carrito[0].productos
            const existe_producto = productos.filter(item => item.id === idProducto)
            if (existe_producto.length !== 0) {
                const filtrado = productos.filter(item => item.id !== idProducto)
                carrito[0].productos = filtrado
                await this.deleteById(idCarrito)
                await this.save(carrito[0], false)
                return {}
            } else { return { error: 'Carritos.deleteProductoById()', descripcion: 'El id del producto ingresado no existe en este carrito' } }
        } else { return { error: 'Carritos.deleteProductoById()', descripcion: 'El id del carrito ingresado no existe en la Base de Datos' } }
    }
}

const carritos = new Carritos('./modulos/fileSistem/carritos.json')
module.exports = carritos