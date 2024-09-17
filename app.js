const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const mysql = require('mysql2');

// Carica variabili di ambiente
dotenv.config();

// Connessione a MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connesso a MongoDB'))
  .catch((err) => console.error('Errore di connessione a MongoDB:', err));

// Configura la connessione MySQL
const mysqlConnection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

mysqlConnection.connect((err) => {
  if (err) {
    console.error('Errore di connessione a MySQL:', err);
  } else {
    console.log('Connesso a MySQL');
  }
});

// Configura Express
const app = express();
app.use(bodyParser.json());

// Importa le rotte
const userRoutes = require('./routes/users');
const productRoutes = require('./routes/products');
const swapOrderRoutes = require('./routes/swapOrders');

// Definisci le rotte
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/swaporders', swapOrderRoutes);

// Middleware per gestione errori
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Si è verificato un errore interno del server" });
});

// Funzione per inserire un utente in MySQL
app.post('/api/mysql/users', (req, res) => {
  const { firstName, lastName, email } = req.body;
  const query = 'INSERT INTO users (first_name, last_name, email) VALUES (?, ?, ?)';

  mysqlConnection.execute(query, [firstName, lastName, email], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Errore durante l\'inserimento dell\'utente' });
    }
    res.status(201).json({ message: 'Utente inserito con successo', id: results.insertId });
  });
});

// Avvia il server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server in ascolto sulla porta ${PORT}`);
});
