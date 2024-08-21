const express = require('express');
const app = express();
const bookRoutes = require('./routes/bookRoutes');
const memberRoutes = require('./routes/memberRoutes');
const borrowRoutes = require('./routes/borrowRoutes');

app.use(express.json());
app.use('/books', bookRoutes);
app.use('/members', memberRoutes);
app.use('/borrows', borrowRoutes);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
