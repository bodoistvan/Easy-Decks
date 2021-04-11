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
const soundRouter = require('./routes/soundRouter');
const flagInfoRouter = require('./routes/flagInfoRouter');
const cardRouter = require('./routes/cardRouter');
const PORT = 3000;

app.use(express.static('static'))

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/api/users', userRouter)
app.use('/api/decks', deckRouter)
app.use('/api/quizes', quizRouter)
app.use('/api/cardStat', cardStatRouter)
app.use('/api/quizResults', quizResultRouter)
app.use('/api/reports', reportRouter)
app.use('/api/sounds', soundRouter)
app.use('/api/flagInfo', flagInfoRouter)
app.use('/api/cards', cardRouter)

app.use(globalErrorHandler);

app.listen(PORT, ()=>
    console.log(`Backend listening at port ${PORT}...`)
);



