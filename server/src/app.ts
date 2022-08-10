import chalk from 'chalk';
import cors from 'cors';
import express from 'express';
import api from './api';
import config from './config';
import deserializeUse from './lib/middleware/deserializeUser';
const app = express();

app.use(express.json());
app.use(deserializeUse);

app.listen(config.port, async () => {
    app.use(
        cors({
            origin: ['http://localhost:3000'],
            credentials: true,
        })
    );
    console.log(
        chalk.hex('#3498DB')('\nLOG @ ') +
            chalk.hex('#AF7AC5')('server:: ') +
            'running on ' +
            chalk.hex('#5DADE2')(':' + config.port) +
            '\n'
    );
    app.use('/', api);
});
