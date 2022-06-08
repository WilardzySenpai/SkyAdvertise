const express = require('express');
const app = express();
const port = 7878;
app.get('/', (req, res) => res.send('Advertise is Alive!'));

app.listen(port, () => console.log(`Advertise is listening to http://localhost:${port}`));