import {DBService} from '../services/db';

const tableName = 'productos';

class Producto{

    validacion(req, res, next){
        const {nombre,precio,descripcion,codigo,foto,stock} = req.body;
        if(!nombre || !precio || !descripcion || !codigo || !foto || !stock ||
             typeof nombre !== 'string' || 
             typeof descripcion !== 'string' ||
             typeof foto !== 'string' ||
             isNaN(precio) ||  isNaN(codigo) ||  isNaN(stock))
            return res.status(400).json({
                msg: "Campos del body invalidos"
            })
        next();

    }
    async getProducto(req, res){
        const items = await DBService.get(tableName);
        res.json({
            data:items
        })
    }

    async getProductoById(req,res){
        const {id} = req.params;
        const item = await DBService.get(tableName,id);
        if(!item.length)
        return res.status(404).json({
            msgs: 'Producto no encontrado'
        });
        res.json({
            data:item
        })
    }
    async addProducto(req, res){
        const {nombre,precio,descripcion,codigo,foto,stock} =req.body;
        if(!nombre || !precio || !descripcion || !codigo || !foto || !stock)
        return res.status(400).json({
            msg: 'Faltan datos por completar'
        });
        const data = {
            nombre,
            precio,
            descripcion,
            codigo,
            foto,
            stock
        };
        const id = await DBService.create(tableName,data);
        const newItem = await DBService.get(tableName,id);        
        res.json({
            msg: "Productos agregado con exito",
            data: newItem
        })
    }
    async updateProducto(req, res){
        const {id} = req.params;
        const {nombre,precio,descripcion,codigo,foto,stock} = req.body;
        if(!nombre || !precio || !descripcion || !codigo || !foto || !stock)
            return res.status(400).json({
                msg: 'Faltan datos por completar'
            });

            let item = await DBService.get(tableName,id);

            if(!item.length)
            return res.status(404).json({
                msg:'Producto no encontrado'
            });

            const data = {
                nombre,
                precio,
                descripcion,
                codigo,
                foto,
                stock
            };
            await DBService.update(tableName,id,data);
            item = await DBService.get(tableName,id);


        res.json({
            msg: "Actualizando los productos",
            data: item

        })
    }

    async deleteProducto(req, res){
        const { id } = req.params;

        let item = await DBService.get(tableName, id);

        if (!item.length)
        return res.status(404).json({
            msgs: 'Producto no encontrado!',
        });

        await DBService.delete(tableName, id);
        res.json({
        msg: 'Producto eliminada',
        });
  }
}
export const productoController = new Producto();