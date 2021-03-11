
const fs = require('fs')
const {join} = require('path')

const pathFile = join(__dirname,'products.json')

const getProducts = ()=>{

    const data = fs.existsSync(pathFile)? fs.readFileSync(pathFile): []

    try {
        return JSON.parse(data)
    } catch (error) {
        return []
    }
    
}

const postProduct = product => {
    fs.writeFileSync(pathFile, JSON.stringify(product, null, '\t'))
}

const productRoute = (app) => {
    app.route('/products/:id?')
        .get((req,res)=>{
            res.send(getProducts())
        })
        .post((req, res)=>{
            const products = getProducts()

            products.push(req.body)

            postProduct(products)

            res.status(201).send("OK")
        })
        .put((req, res)=>{
            const products = getProducts()
            postProduct(products.map(product => {
                if(req.params.id == product.id){
                    return {
                        ...product,
                        ...req.body
                    }
                }else{
                    return product
                }
            }))

            return res.send("Atualização Completa!")
        })
        .delete((req, res)=>{
            postProduct(getProducts().filter(product => product.id != req.params.id))

            res.send("Deletado com Sucesso!")
        })
}

module.exports = productRoute