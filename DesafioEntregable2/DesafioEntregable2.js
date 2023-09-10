const fs = require('fs');
class ProductManager {
    
    constructor(path){
        this.path = path;
    }

    async getProducts(){
        try {
            if ( fs.existsSync(this.path) ){
                const info = await fs.promises.readFile(this.path,'utf-8');
                return JSON.parse(info);
            } else {
                return [];
            }
        } catch (error) {
            throw error;
        }
    }

    async addProduct(obj){

        try {
            if(
                !obj.title ||
                !obj.description ||
                !obj.price ||
                !obj.thumbnail ||
                !obj.code ||
                !obj.stock
            )
                throw new Error('Por favor complete toda la información del producto.');

            const products = await this.getProducts();

            if(this.#checkCode(obj.code, products))
                throw new Error('El código del producto ya existe. Por favor verifique la información.');

            products.push({ id: this.#makeId(products), ...obj });

            await fs.promises.writeFile(this.path,JSON.stringify(products));
            
        } catch (error) {
            throw error;
        }
    }

    async getProductById(id){
        try {
            const products = await this.getProducts();
            const product = this.products.find(p=>p.id === id);

            if(!product)
                throw new Error('NOT FOUND: El producto solicitado no existe.');
    
            return product;

        } catch (error) {
            throw error;
        }
    }

    async delProduct(id){
        try {
            const products = await this.getProducts();
            const newCatalog = products.filter(p=>p.id!==id);

            await fs.promises.writeFile(this.path,JSON.stringify(newCatalog));

        } catch (error) {
            throw error;
        }
    }

    #checkCode(code, products){
        return products.find(p=>p.code === code);
    }
    
    #makeId(products){
        if(products.length)
            return products[products.length-1].id + 1;
        else
            return 1;
    }
}

// TESTING:

const producto1 = {
    "title": "producto prueba",
    "description":"Este es un producto de prueba",
    "price":200,
    "thumbnail":"Sin imágen",
    "code":"abc123",
    "stock":25
}
const producto2 = {
    "title": "otro producto prueba",
    "description":"Este es otro producto de prueba",
    "price":2000,
    "thumbnail":"Sin imágen",
    "code":"a123",
    "stock":23
}
const producto3 = {
    "title": "otro mas",
    "description":"el 3ro",
    "price":12,
    "thumbnail":"Sin imágen",
    "code":"332",
    "stock":33
}

const file = 'productos.json';

// reset, borrar archivo
fs.unlinkSync(file);

const test = async () => {
    const listaProductos = new ProductManager(file);
    console.log("lista vacia:", await listaProductos.getProducts());

    await listaProductos.addProduct(producto1);
    console.log("lista con 1 producto:", await listaProductos.getProducts());

    console.log("borrando producto id 1.");
    await listaProductos.delProduct(1);
    console.log("lista vacia:", await listaProductos.getProducts());

    console.log('agregando 3 productos');
    await listaProductos.addProduct(producto1);
    await listaProductos.addProduct(producto2);
    await listaProductos.addProduct(producto3);
    console.log("lista con 3 productos:", await listaProductos.getProducts());

}

test();



/* // TESTING:

const listaProductos = new ProductManager();
console.log("lista vacia: ",listaProductos.getProducts());

listaProductos.addProduct("producto prueba","Este es un producto de prueba",200,"Sin imágen","abc123",25);
listaProductos.addProduct("producto prueba 2","Este es otro producto de prueba",300,"Sin imágen","123456",100);
listaProductos.addProduct("Sanguche de milanesa","Excelente",3300,"Sin imágen","codigo",200);
console.log("lista: ", listaProductos.getProducts());

console.log("producto 1: ", listaProductos.getProductById(1));
console.log("producto 2: ", listaProductos.getProductById(2));
console.log("producto 2: ", listaProductos.getProductById(3));

// ERRORES:

console.log(listaProductos.getProductById(55));
listaProductos.addProduct("producto prueba",200,"Sin imágen","abc123",25);
listaProductos.addProduct("producto prueba","Este es un producto de prueba",200,"Sin imágen","abc123",25); */