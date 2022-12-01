import 'dotenv/config';

import chalk from 'chalk';
import cors from 'cors';
import express from 'express';
import passport from 'passport';
import api from './api';
import config from './config';
import authStrategy from './lib/authStrategy';
import { redis } from './lib/utils/redis';

const app = express();

const session = require('express-session');
let RedisStore = require('connect-redis')(session);

app.use(express.json());

app.listen(config.port, async () => {
    await redis.connect();

    app.use(
        session({
            store: new RedisStore({
                client: redis,
            }),
            secret: 'cssapp-store',
            saveUninitialized: true,
            resave: true,
            // cookie: {
            //     maxAge: 30 * 24 * 60 * 60 * 1000,
            // },
        })
    );

    console.log(
        chalk.hex('#2ECC71')('SUCCESS @ ') +
            chalk.hex('#AF7AC5')('server::') +
            chalk.hex('#DC7633')('redis: ') +
            'connected to redis...'
    );

    authStrategy();
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(
        cors({
            origin: [
                'http://localhost:3000',
                'https://css.app',
                'https://www.css.app',
                'www.css.app',
                'https://css-app-git-vercel-og-audn.vercel.app',
                'https://www.css-app-git-vercel-og-audn.vercel.app',
                'www.css-app-git-vercel-og-audn.vercel.app',
                'https://css-app-git-puppeteer-thumbnails-audn.vercel.app',
                'https://www.css-app-git-puppeteer-thumbnails-audn.vercel.app',
            ],
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
