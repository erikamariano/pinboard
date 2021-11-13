let PORT = 3000;
const express = require('express');
const path = require('path');
const apiRouter = require('./routes/api');

const app = express();

app.use('/api', apiRouter);

app.use(express.static(path.join(__dirname, 'public'))) // it's gonna look for the 'index.html' file in the 'public' directory.


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})


