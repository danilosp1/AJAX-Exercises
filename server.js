const bodyParser = require('body-parser')
const express = require('express')
const app = express()

// dentro da pasta atual (.), sirva todos os arquivos estáticos (html, js, css...)
app.use(express.static('.'))

// lê os dados e transforma em objeto (extended: true -> indica que vai receber tipos além de string)
app.use(bodyParser.urlencoded({ extended: true }))

// transformar json em objeto
app.use(bodyParser.json())

// Quando uma requisição do tipo GET acontecer na url /teste, vai chamar a middleware
app.get('/teste', (req, res) => res.send('Ok'))

// interpretar formulário que veio o arquivo de upload
const multer = require('multer')

const storage = multer.diskStorage({
    destination: function(req, file, callback){
        callback(null, './upload')
    },
    filename: function(req, file, callback){
        callback(null, `${Date.now()}_${file.originalname}`)
    }
})

const upload = multer({ storage }).single('arquivo')

app.post('/upload', (req, res) => {
    upload(req, res, err => {
        if(err){
            return res.end('Ocorreu um erro.')
        }
        res.end('Concluído com sucesso.')
    })
})

app.post('/formulario', (req, res) => {
    res.send({
        ...req.body,
        id: 1
    })
})

app.get('/parOuImpar', (req, res) => {
    // forma de receber dados do front:
    // req.body
    // req.query (url)
    // req.params (ex: /parOuImpar/:numero)
    const par = parseInt(req.query.numero) % 2 === 0
    res.send({
        resultado: par ? 'par' : 'impar'
    })
})

// inicia servidor
app.listen(8080, () => console.log('Executando...'))