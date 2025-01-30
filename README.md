# Web Agency Landing Page

A modern, responsive landing page for a web development agency.

### Info
The project url is https://landing-next-prisma.vercel.app/ and the performance report have been made at 15h (fr) 3PM (UK), the 30/01/2025.
The project is about a web agency maintain by ZHANG Tony & PARISOT Romain, both working in freelance for the ZhangParisot Agency.

## Performance report

### Tools used for the perf report

- Lighthouse
- PageSpeed Insights
- WebPageTest
- SemRush


![audit1](https://github.com/user-attachments/assets/e577c46d-c2e5-4059-8576-9d996b78a6cb)



![audit2](https://github.com/user-attachments/assets/a75144c5-5df7-4564-936e-2b28e22dbd3d)



![audit3](https://github.com/user-attachments/assets/fbb98457-570f-4391-b5e9-90e3667ad43e)

See: https://pagespeed.web.dev/analysis/https-landing-next-prisma-vercel-app/c62zg2l6vj?form_factor=desktop

![audit4](https://github.com/user-attachments/assets/e6b0bd4f-c63b-4b02-b711-43c86d5cc92c)

See: https://pagespeed.web.dev/analysis/https-landing-next-prisma-vercel-app/c62zg2l6vj?form_factor=mobile

![audit5](https://github.com/user-attachments/assets/b2919d6d-20b7-427e-ab34-e863c5c8de6d)


![audit6](https://github.com/user-attachments/assets/aa912629-eacc-4aa9-8525-ad72dc560c46)


### Scrore Summary

| Metric                 | Mobile  | Desktop |
|------------------------|---------|---------|
| **LCP** (Largest Contentful Paint) | 23/25  | 25/25  |
| **CLS** (Cumulative Layout Shift)  | 25/25  | 25/25  |
| **FCP** (First Contentful Paint)   | 10/10  | 10/10  |
| **TBT** (Total Blocking Time)      | 30/30  | 30/30  |
| **Speed Index**                    | ~0.8   | ~0.8   |
| **Total Blocking Time**             | ~600ms | ~100ms |

## Recommandtions
The recommendation to optimize the website is to work on the authority score to improve SEO. On the technical side, there is not much optimization to do except improving the color contrast for accessibility and refactoring the size of the JS script, which could be slightly optimized.

## Features

- 🎯 Landing Page Presentation
- 👥 Contact Form
- 💫 Modern Design & Animations
- 📱 Dynamic Project Sections
- 🎨 Custom UI Components

## Tech Stack

- Next.js 13
- React
- TypeScript
- Material-UI
- Prisma

## Getting Started

### Prerequisites

- Node.js 16.8 or later
- npm, yarn or pnpm

### Installation

1. Clone the repository

```bash
git clone https://github.com/yourusername/landing-next-prisma.git
```

2. Install dependencies

```bash
cd landing-next-prisma
npm install
```

3. Create a .env file in the root
```bash
DATABASE_URL="file:./dev.db"
JWT_SECRET=Secret
```
4. In prisma/schema.prisma edit
```bash
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```
to 
```bash
datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}
```

5. Migration

```bash
npx prisma migrate dev --name init
```

6. Generate admin

```bash
npx prisma db seed
```

7. Run the development server

```bash
npm run dev
```

8. Open http://localhost:3000 to view the project.

## Project Structure

```bash
landing-next-prisma/
├── src/
│   ├── app/
│   │   ├── (admin)/
│   │   │   ├── login/
│   │   │   │   └── page.tsx
│   │   │   └── dashboard/
│   │   │       └── page.tsx
│   │   ├── actions/
│   │   │   └── adminActions.ts
│   │   └── layout.tsx
│   ├── lib/
│   │   └── auth.ts
│   ├── frameworks/
│   │   └── db.ts
│   ├── components/
│   │   ├── ui/
│   │   │   └── button.tsx
│   │   └── admin/
│   │       └── LoginForm.tsx
│   └── styles/
│       └── globals.css
├── prisma/
│   ├── schema.prisma
│   └── dev.db
├── public/
│   └── img/
│   └── images/
├── .env
├── package.json
├── next.config.js
└── tailwind.config.ts
```
## Dashboard admin

https://landing-next-prisma.vercel.app/login

username: admin
password: password

## Authors

- **Romain PARISOT** - _Front-end Developer_
- **Tony ZHANG** - _Back-end Developer_

## License

This project is licensed under the MIT License

## Contact

- LinkedIn: [Romain PARISOT](https://www.linkedin.com/in/romainparisot-/)
- LinkedIn: [Tony ZHANG](https://www.linkedin.com/in/tony-zhang-tufu/)
