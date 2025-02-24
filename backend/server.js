const express = require('express');
const cors = require('cors');
const app = express();
const port = 4001;

app.use(express.json());
app.use(cors({ origin: 'http://localhost:4000' }));

app.get('/', (req, res) => {
  res.send('Hello from CalenBooker backend!');
});

app.post('/signup', (req, res) => {
  const { email, password } = req.body;
  console.log('Signup attempt:', { email, password });
  res.status(200).json({ message: 'Signup successful! Check your email to confirm.' });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});