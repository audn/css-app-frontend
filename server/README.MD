# css.app

This is a overcomplicated brainstorming app for the purpose of learning backend.

- [Make an issue](https://github.com/audn/css.app/issues)

- [Join Discord](http://audun.gg/discord)

## 🚀 Installation & Running

_Make sure you're in the **server/** directory_

Before you can run this locally, you need to install [PostgresSQL](https://www.postgresql.org/).

When installing PostgresSQL, put the master password as `postgres`.

💪🏼 _Install pnpm (package manager)_

```bash
npm i -g pnpm
```

📦 _Install the required packages_

```bash
pnpm i
```

👀 Rename `.env.example` to `.env`

🏘️ _Migrate Prisma Database_

```bash
pnpm run migrate:dev
```

_🔨 Runs with **ts-node** whilst watching **src/** for changes_

```bash
pnpm run dev
```
