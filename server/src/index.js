const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const middlewares = require('./middlewares');
const mongoose = require('mongoose');
const logs = require('./api/logs');

require('dotenv').config();

mongoose.connect(process.env.DATABASE_URL, {
	useUnifiedTopology: true,
	useNewUrlParser: true
});

const app = express();
app.use(morgan('common'));
app.use(helmet());
app.use(
	cors({
		origin: 'http://localhost:3000'
	})
);
app.use(express.json());

app.get('/', (req, res) => {
	console.log(res);
	res.json({
		message: 'Hello World!'
	});
});

app.use('/api/logs', logs);

app.use(middlewares.notFound);

app.use(middlewares.errorHandler);

const port = process.env.PORT || 1337;
app.listen(port, () => {
	console.log(`Listening at http://localhost:${port}`);
});
