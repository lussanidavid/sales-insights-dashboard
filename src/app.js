const express = require('express')
const cors = require('cors')

const salesRoutes = require('./routes/salesRoutes')

const app = express()

app.use(cors())
app.use(express.json())

app.use(salesRoutes)

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000')
})