const express = require('express');
const app = express();
const port = 3000;

// Serve static files from the same directory as this script
app.use(express.static('.'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
