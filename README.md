# Joshua Hu — Portfolio

Personal portfolio site for Joshua Hu, AI/ML Engineer. Built with Next.js, Tailwind CSS, and Shadcn UI, with a Vercel-inspired dark mode and an Apple-inspired light mode.

## Live Site

🌐 **[joshuahu.dev](https://joshuahu.dev)**

## Features

- Minimal, responsive design with Shadcn UI
- Dark / light theme toggle
- Contact form with email integration
- Resume download
- Project and career timeline driven by structured JSON data

## Tech Stack

- Next.js
- Tailwind CSS
- Shadcn UI
- Geist (font family)
- Resend (contact form email)
- Vercel (hosting)

## Getting Started

```bash
git clone https://github.com/JoshuaCongHu/Portfolio.git
cd Portfolio
npm install
cp .env.example .env.local
# add required API keys to .env.local
npm run dev
```

## Environment Variables

See `.env.example`.

## Project Structure

- `src/data/*.json` — personal info, career history, education, projects, skills, and social links
- `public/resume.pdf` — resume served for download
- `src/app/globals.css` — theme tokens for dark/light modes

## Deployment

Hosted on [Vercel](https://vercel.com/), deployed automatically from `main`.

## License

MIT
