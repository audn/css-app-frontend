import rateLimit from 'express-rate-limit';

export const addRatelimiter = ({
    amount,
    wait = 0 ?? 128, // 5 days
}: {
    amount: number;
    wait?: number;
}) =>
    rateLimit({
        windowMs: wait * 60 * 60 * 1000,
        max: amount,
        standardHeaders: true,
        legacyHeaders: false,
    });
