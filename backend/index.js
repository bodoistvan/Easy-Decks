const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const deckRouter = require('./routes/deckRouter');
const userRouter = require('./routes/userRouter');
const PORT = 3000;


app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/api/users', userRouter)
app.use('/api/decks', deckRouter)



app.use((err, req, res, next) => {
    res.status(500);
    res.end("problem..." + err);
    console.log(err);
});

app.listen(PORT, ()=>
    console.log(`Backend listening at port ${PORT}...`)
);



