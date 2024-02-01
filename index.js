
const express = require('express') //Chamando a biblioteca
const uuid = require('uuid') // Chamando a biblioteca e dando continuidade nela no app.post
const app = express() // Simplificando o chamado da biblioteca
const port = 3001
app.use(express.json())

//Simulando banco de dados (se eu reiniciar meu servidor node, perco todas as informações "É somente para fins didáticos")
const users = []
// Criando MIDDLEWARE:
// LEMBRANDO QUE O MIDDLEWARE SÓ VAI CHAMAR QUEM ESTIVER ABAIXO DELE
// const myFirstMiddleware = (request, response, next) =>{ //Padrão do midlleware
//     console.log('Fui chamado') // Mostrando no terminal que foi chamado
//  next()
// }
// app.use(myFirstMiddleware) // Aqui estou dizendo que vou usar o middleware, ou seja ele vai para a aplicação pois ele está acima de todas rotas, para isso existe o next()
//Pois usando ele eu consigo fazer com que a rota siga funcionando, então vou la e coloco o NEXT() dentro do mymiddleware


//Enviando informações, LISTANDO USUARIOS
app.get('/Projeto-usuarios', (request, response) => {
    console.log('A rota foi chamada')
    return response.json(users)
})

//Puxando informações, ADICIONANDO NOVOS USUARIOS
app.post('/Projeto-usuarios', (request, response) => {
    const { name, age } = request.body
    const user = { id: uuid.v4(), name, age } // Criando o usuario e dando continuidade no uuid criando um id unico só dele
    users.push(user) // Inserindo o usuario dentro do array vazio
    return response.status(201).json(user) //Definindo o status 201 (Criado)para mostrar que funcionou corretamente
})

//Atualizando usuários
//Utilizando route params
app.put('/Projeto-usuarios/:id', (request, response) => {
    const { id } = request.params //Identificando id's dos usuarios
    const { name, age } = request.body // Trazendo as informações do insominia que estão no body do mesmo (Pegando as informações do usuario)
    const updateUser = { id, name, age } // Atualizando o novo usuario
    const index = users.findIndex(user => user.id === id)// Percorrendo o array e rncontrando o usuario que escolhi la no insominia atraves da url este monte de numero é o id http://localhost:3001/Projeto-usuarios/2f5100cf-9b16-4b62-8c2e-56d44fcb9a67
    if (index < 0) {
        return response.status(404).json({ message: "User not found" }) // Se não encontrar o usuario ele cai aqui e então irá mostrar a msg 404
    }
    users[index] = updateUser //Atualizando as informações que eu quiser mudar do usuario, idade nome enfim, tudo la pelo insominia
    return response.json(updateUser)
})

//Deletando usuario
app.delete('/Projeto-usuarios/:id', (request, response) => {
    const { id } = request.params //Identificando id's dos usuarios

    const index = users.findIndex(user => user.id === id)// Percorrendo o array e rncontrando o usuario que escolhi la no insominia atraves da url este monte de numero é o id http://localhost:3001/Projeto-usuarios/2f5100cf-9b16-4b62-8c2e-56d44fcb9a67
    if (index < 0) {
        return response.status(404).json({ message: "User not found" }) // Se não encontrar o usuario ele cai aqui e então irá mostrar a msg 404
    }

    users.splice(index, 1) // Splice deleta um conteudo do array, index é o item do array atualmente e 1 corresponde a que quero deletar 1 só
    return response.status(204).json() // status 204 é vazio por isso depois do json está os () vazio "Só estou comemorando um status de sucesso"
})





















//Traçando um parametro para monitorar a porta de saida
app.listen(port, () => {
    console.log(`${port} servidor online 🚀😁`)
})