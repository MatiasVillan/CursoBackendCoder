import { productsModel } from '../db/models/products.model.js'
import BasicManager from './BasicManager.js';

class ProductManager extends BasicManager {

    constructor(path) {
        super(productsModel);
    }

    async findAllProducts(obj) {
        const { limit = 10, page = 1, sort:sortPrice, ...queryFilter } = obj;
        const url = `http://localhost:8080/api/products?limit=${limit}&page=`

        const response = await productsModel.paginate(queryFilter, { 
            limit, 
            page, 
            sort: {price: sortPrice === "asc" ? 1 : -1 },
            lean: true,
            status: "success",
        });

        response.prevLink = response.hasPrevPage
            ? url+response.prevPage
            : null
        response.nextLink = response.hasNextPage
            ? url+response.nextPage
            : null
        
        if(response.hasPrevPage && sortPrice)
            response.prevLink += `&sort=${sortPrice}`

        if(response.hasNextPage && sortPrice)
            response.nextLink += `&sort=${sortPrice}`

        return response;
    }
}

export const productManager = new ProductManager();