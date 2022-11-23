import 'dotenv/config';

import chalk from 'chalk';
import cors from 'cors';
import express from 'express';
import passport from 'passport';
import api from './api';
import config from './config';
import authStrategy from './lib/authStrategy';
import deserializeUse from './lib/middleware/deserializeUser';
import { redis } from './lib/utils/redis';

const app = express();

const session = require('express-session');
let RedisStore = require('connect-redis')(session);

app.use(express.json());
app.use(deserializeUse);

app.listen(config.port, async () => {
    await redis.connect();
    console.log(
        chalk.hex('#2ECC71')('SUCCESS @ ') +
            chalk.hex('#AF7AC5')('server::') +
            chalk.hex('#DC7633')('redis: ') +
            'connected to redis...'
    );
    app.set('trust proxy', 1);
    app.use(
        session({
            store: new RedisStore({ client: redis }),
            secret: 'Whatever_You_Want',
            saveUninitialized: true,
            resave: true,
            cookie: {
                maxAge: 30 * 24 * 60 * 60 * 1000,
            },
        })
    );
    authStrategy();
    app.use(passport.initialize());
    app.use(passport.session());
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
