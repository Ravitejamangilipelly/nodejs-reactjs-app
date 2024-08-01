const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const auth = require('./auth');
const todos = require('./todos');
const app = express();
const dotenv = require('dotenv');
dotenv.config();

app.use(cors());
app.use(bodyParser.json());

app.use('/api', auth);
app.use('/api', todos);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
