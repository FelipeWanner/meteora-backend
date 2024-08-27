const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const path = require('path'); // para servir arquivos estáticos
const db = require('./db'); // conexão com o SQL

const productRoutes = require('./routes/products');
const clientRoutes = require('./routes/clients');
const orderRoutes = require('./routes/orders');
const employeeRoutes = require('./routes/employees');

// carrega o dotenv
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

app.use('/api/products', productRoutes);



// Teste de conexão
app.get('/', (req, res) => {
  res.send('Hello, this is the backend of our store application');
});

// Serve as imagens (ou arquivos estáticos) da pasta 'public/images'
app.use('/uploads', express.static(path.join(__dirname, 'public/images')));

// Inicia o servidor
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
