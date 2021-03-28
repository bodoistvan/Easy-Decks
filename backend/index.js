const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const globalErrorHandler = require('./controllers/errorController');
const deckRouter = require('./routes/deckRouter');
const userRouter = require('./routes/userRouter');
const quizRouter = require('./routes/quizRouter');
const quizResultRouter = require('./routes/quizResultRouter')
const cardStatRouter = require('./routes/cardStatRouter');
const reportRouter = require('./routes/reportRouter');
const PORT = 3000;


app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/api/users', userRouter)
app.use('/api/decks', deckRouter)
app.use('/api/quizes', quizRouter)
app.use('/api/cardStat', cardStatRouter)
app.use('/api/quizResults', quizResultRouter)
app.use('/api/reports', reportRouter)

app.use(globalErrorHandler);

app.listen(PORT, ()=>
    console.log(`Backend listening at port ${PORT}...`)
);



