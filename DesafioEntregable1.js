class ProductManager {
    
    constructor(){
        this.products = [];
    }

    addProduct(title,description,price,thumbnail,code,stock){

        if(
            !title ||
            !description ||
            !price ||
            !thumbnail ||
            !code ||
            !stock
        )
            throw new Error('Por favor complete toda la información del producto.');

        if(this.#checkCode(code))
            throw new Error('El código del producto ya existe. Por favor verifique la información.'); 

        const product = {
            id: this.#makeId(),
            title: title,
            description: description,
            price: price,
            thumbnail: thumbnail,
            code: code,
            stock: stock,
        }
        this.products.push(product);
    }

    getProducts(){
        return this.products;
    }

    getProductById(id){
        const product = this.products.find(p=>p.id === id);

        if(!product)
            throw new Error('NOT FOUND: El producto solicitado no existe.');

        return product;
    }

    #checkCode(code){
        return this.products.find(p=>p.code === code);
    }
    
    #makeId(){
        if(this.products.length)
            return this.products[this.products.length-1].id + 1;
        else
            return 1;
    }
}


// TESTING:

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

listaProductos.addProduct("producto prueba","Este es un producto de prueba",200, "Sin imágen", "abc123", 25);

