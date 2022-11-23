const Redis = require('ioredis');

export const redis = new Redis(process.env.REDIS_URI, {
  lazyConnect: true,
});

export async function wrapRedis<T>(
  key: string,
  fn: () => Promise<T> | T,
  seconds = 60 * 60 * 6, //6 hours
): Promise<T> {
  //       redis.flushall();
  const cached = await redis.get(key);
  if (cached) return JSON.parse(cached);

  const recent = await fn();

  if (recent) {
    await redis.set(key, JSON.stringify(recent), 'ex', seconds);
  }
  return recent;
}
