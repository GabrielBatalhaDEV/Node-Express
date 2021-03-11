const express = require('express')
const userRoute = require('./routes/usersRoutes.js')
const productRoute = require('./routes/productRoutes.js')

const app = express()

app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));

const port = 3000

app.get('/',(req,res)=>{
    return res.send('Olá Mundo')
})

userRoute(app)
productRoute(app)

app.listen(port,()=>{
    console.log(`Listenning ${port}`);
})


