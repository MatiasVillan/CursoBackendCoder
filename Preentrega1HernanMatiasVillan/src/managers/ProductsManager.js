import fs from 'fs';

class ProductManager {
    
    constructor(path){
        this.path = path;
    }

    async getProducts(query){
        const { limit } = query;
        try {
            if ( fs.existsSync(this.path) ){
                const info = await fs.promises.readFile(this.path,'utf-8');
                const productList = JSON.parse(info);
                return limit ? productList.slice(0, limit) : productList;
            } else {
                return [];
            }
        } catch (error) {
            return error;
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

            const products = await this.getProducts({});

            if(this.#checkCode(obj.code, products))
                throw new Error('El código del producto ya existe. Por favor verifique la información.');

            products.push({ id: this.#makeId(products), ...obj });

            await fs.promises.writeFile(this.path,JSON.stringify(products));
            
        } catch (error) {
            return error;
        }
    }

    async getProductById(id){
        try {
            const products = await this.getProducts({});
            const product = products.find(p=>p.id === id);
  
            if(!product)
                throw new Error('NOT FOUND.');
            
            return product;

        } catch (error) {
            return error;
        }
    }

    async delProduct(id){
        try {
            const products = await this.getProducts({});
            const newCatalog = products.filter(p=>p.id!==id);

            if (products.length === newCatalog.length)
                throw new Error('No se eliminó nada. Id de producto inexistente.');

            await fs.promises.writeFile(this.path,JSON.stringify(newCatalog));

        } catch (error) {
            return error;
        }
    }

    async updateProduct(id, obj) {
        try{
            const products = await this.getProducts();
            const productIndex = products.findIndex(p=>p.id===id);

            if(productIndex===-1)
                throw new Error('No se actualizo nada. Id de producto inexistente.');

            products[productIndex] = {...products[productIndex], ...obj};
            await fs.promises.writeFile(this.path,JSON.stringify(products));

        }catch (error){
            return error;
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

export const productManager = new ProductManager('./data/productos.json');