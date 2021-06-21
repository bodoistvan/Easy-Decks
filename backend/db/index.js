const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/easydecks', { useNewUrlParser: true });

module.exports = mongoose;