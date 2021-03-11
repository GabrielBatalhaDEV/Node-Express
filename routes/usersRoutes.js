
const fs = require('fs')
const {join} = require('path')

const filePath = join(__dirname, 'users.json')

const getUsers = () => {
    const data = fs.existsSync(filePath)?
     fs.readFileSync(filePath):
     []

     try {  
        return JSON.parse(data)
     } catch (error) {
         return []
     }
}

const saveUsers = users => {
    fs.writeFileSync(filePath, JSON.stringify(users, null, '\t'))
}

const userRoute = app => {
    app.route('/users/:id?')
    .get((req,res)=>{
        const users = getUsers()
        console.log(users);
        res.send({ users })
    })
    .post((req, res)=>{
        const users = getUsers()

        users.push(req.body)

        saveUsers(users)

        res.status(201).send('OK')
    })
    .put((req,res)=>{
        const user = getUsers()

        saveUsers(user.map(user =>{
            if(user.id == req.params.id){
                return {
                    ...user,
                    ...req.body
                }
            }else{
                return user
            }
        }))

        res.status(200).send({ message: "Tudo Certo!"})
    })
    .delete((req,res)=>{
        const users = getUsers()

        saveUsers(users.filter(user => user.id != req.params.id))

        res.status(200).send({message: 'Deletado com sucesso!'})
    })
}

module.exports = userRoute