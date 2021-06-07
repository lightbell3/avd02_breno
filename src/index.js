const express = require('express')
const app = express()
app.use(express.json())
const uuid = require('uuid')

funcionarios = [
  { id: uuid.v4() , nome: 'Breno', departamento: 'TI', email: 'breno2926@gmail.com', 
  telefone: '(24)33374894', funcao: 'programador'},
  { id: uuid.v4() , nome: 'Marcos', departamento: 'TI', email: 'msgoes@gmail.com', 
  telefone: '(24)33374894', funcao: 'analista' }
]

//método criado com base no ensinado na aula
const CheckIdInArray = (request, response, next) => {
    const { id } = request.params
    const funcionario = funcionarios.filter(func => func.id === id)

    console.log(funcionario)
    if (funcionario.length === 0) {  
      return response
        .status(400)
        .json({ Error: 'Id Inexistente' })
    }
    return next()
}

const verificaCadastro = (request, response, next) => {
    const { nome, departamento, email, telefone, funcao } = request.body
    if (!nome || !departamento || !email || !telefone || !funcao) {
      return response
        .status(400)
        .json({
          Error:
            'Favor preencher o campo nome ou e-mail ou função ou departamento ou telefone '
        })
    }
    return next()
}

// http: get - listar todos os funcionários
// rota: /funcionarios
app.get('/funcionarios', (request, response) => {
    return response
      .status(200)
      .json(funcionarios)
})

// Lista funcionario pelo id
// http: get - busca a informacão pelo id
// rota: /funcionario/:id - http://localhost:3333/funcionarios/9292929djaak9293
// parâmetro na rota - request.params
app.get('/funcionarios/:id', CheckIdInArray, (request, response) => {
    const { id } = request.params
    const funcionario = funcionarios.filter(func => func.id === id)

    return response
      .status(200)
      .json(funcionario)
})

app.post('/funcionarios', verificaCadastro, (request, response) => {
    const { nome, departamento, email, telefone, funcao } = request.body
    const dadosFuncionario = {
      id: uuid.v4(),
      nome,
      departamento, 
      email, 
      telefone,
      funcao
    }

    funcionarios = [...funcionarios, dadosFuncionario]
    return response
      .status(200)
      .json(dadosFuncionario)
})

app.put('/funcionarios/:id', CheckIdInArray, verificaCadastro, (request, response) => {
    const { nome, departamento, email, telefone, funcao } = request.body
    const { id } = request.params
    let indice = funcionarios.findIndex(func => func.id === id)
    const dadosFuncionario = {
      id,
      nome,
      departamento, 
      email, 
      telefone,
      funcao
    }

    funcionarios.splice(indice, 1, dadosFuncionario)
    return response
      .status(200)
      .json(dadosFuncionario)
})

app.delete('/funcionarios/:id', CheckIdInArray, (request, response) => {
    const { id } = request.params
    const indice = funcionarios.findIndex(func => func.id === id)
    console.log(indice)
    console.log(funcionarios[indice])
    funcionarios.splice(indice, 1)
    return response
      .status(200)
      .json({ message: 'Registro excluído com sucesso !!!!' })
  })


app.listen(3333, ()=>{
    console.log("Servidor rodando!!")
})
