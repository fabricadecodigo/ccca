This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, adjust your mongodb connection
- Rename the file .env.example to .env
- Put your connection string into the variable DATABASE_URL


Second, run the development server:

```bash
npm install
npm run prisma:generate
npm run prisma:push
npm run prisma:seed
npm run dev
```



Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
