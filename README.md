# 🚀 PDF-Shift-Engine (MyPDF Online Toolkit)

A fast, modern, and free online PDF conversion toolkit that lets users seamlessly convert PDF documents to Word and vice versa with 100% precision. Powered by Next.js 15 App Router, React 19, and the official CloudConvert API v2 for reliable, high-fidelity document processing.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-pdf--shift--engine.vercel.app-0070F3?style=for-the-badge&logo=vercel&logoColor=white)](https://pdf-shift-engine.vercel.app)
[![GitHub Repo](https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/razazaheer12/PDF-Shift-Engine.git)

<img width="959" height="434" alt="image" src="https://github.com/user-attachments/assets/131e52f6-8a02-47bd-aae7-06edb7e4c7c1" />

---

## 🌟 Key Features

- 📄 **PDF to Word Conversion (.docx)**: Convert complex PDF files to fully editable Microsoft Word documents with layouts, styles, and typography preserved.
- 📝 **Word to PDF Conversion**: Convert DOC and DOCX documents into clean, standard PDF files ready for distribution or printing.
- ⚡ **Production-Ready CloudConvert Engine**: Powered by CloudConvert API v2 with server-side stream processing for zero file corruption and enterprise-grade conversion fidelity.
- ☀️ **Permanent Light Mode Theme**: Locked to an elegant, high-contrast light theme (white background with subtle slate cards) for maximum readability and distraction-free document workflows.
- 🎨 **Polished & Unified Hero UI/UX**: Modernized hero banner featuring subtle ambient glow accents, paired with consistent card styling, padding, dashed dropzones, and typography across both conversion tools.
- 🌐 **Global Footer Layout**: Unified global footer rendered consistently across all application routes (Home, About, Privacy, Contact, and History).
- 📜 **Reliable Conversion History & Persistence**: Converted documents and download details reliably persist across browser sessions in `localStorage`. Includes a real-time reactive counter in the navigation bar that syncs automatically across page transitions and item deletions.
- 🔒 **Zero-Storage Privacy Guarantee**: Files are streamed directly to the conversion backend and purged automatically after download—ensuring complete user confidentiality.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | [Next.js 15](https://nextjs.org/) (App Router, Node.js Server Runtime) |
| **Frontend Library** | [React 19](https://react.dev/) |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) & [Radix UI](https://www.radix-ui.com/) primitives |
| **API Integration** | [CloudConvert Node.js SDK v3](https://cloudconvert.com/api/v2) |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **Deployment** | [Vercel](https://vercel.com/) |
| **Package Manager** | [pnpm](https://pnpm.io/) |

---

## 🚀 Live Demo

Check out the live application hosted on Vercel:  
🔗 **[https://pdf-shift-engine.vercel.app](https://pdf-shift-engine.vercel.app)**

---

## 💻 Getting Started (Local Development)

Follow these instructions to clone, configure, and run the project locally on your machine.

### Prerequisites

- **Node.js**: `v20.x` or `v22.x` recommended
- **Package Manager**: `pnpm` (recommended) or `npm` / `yarn`
- **CloudConvert Account**: Free API key from [cloudconvert.com](https://cloudconvert.com/dashboard/api/v2/keys)

### 1. Clone the Repository

```bash
git clone https://github.com/razazaheer12/PDF-Shift-Engine.git
cd PDF-Shift-Engine
```

### 2. Install Dependencies

Using `pnpm`:
```bash
pnpm install
```
*(Or use `npm install` / `yarn install` if preferred)*

### 3. Configure Environment Variables

Create a `.env.local` file in the project root:

```env
# CloudConvert API Key (Required for server-side conversions)
CLOUDCONVERT_API_KEY=your_cloudconvert_api_key_here
```

> 💡 **Note**: Make sure your CloudConvert account email is verified, as CloudConvert requires verification before processing conversion jobs.

### 4. Run the Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) (or the port specified in your terminal) in your browser to view the app.

### 5. Build for Production

To create an optimized production build and verify static page generation:

```bash
pnpm build
pnpm start
```

---

## 📂 Project Architecture

```plaintext
PDF-Shift-Engine/
├── app/
│   ├── api/
│   │   └── convert/
│   │       └── route.ts         # CloudConvert API v2 route handler (Node.js runtime)
│   ├── about/
│   │   └── page.tsx             # About platform page
│   ├── contact/
│   │   └── page.tsx             # Contact & support page
│   ├── history/
│   │   └── page.tsx             # Local conversion history view
│   ├── privacy/
│   │   └── page.tsx             # Privacy and security guidelines
│   ├── globals.css              # Tailwind and design token styles (light theme locked)
│   ├── layout.tsx               # Root layout, fonts, and scripts
│   └── page.tsx                 # Main converter interface (Hero + Dropzones + Features)
├── components/
│   ├── footer.tsx               # Global footer component
│   ├── navbar.tsx               # Navigation bar with reactive history badge
│   └── ui/                      # Reusable UI & Radix components
├── lib/
│   ├── history.ts               # LocalStorage persistence & reactive history hook
│   └── utils.ts                 # Classname utility helpers
├── public/                      # Static assets & illustrations
├── .env.local                   # Environment configuration (ignored in git)
├── package.json                 # Project dependencies & scripts
├── pnpm-lock.yaml               # Pnpm lockfile
└── README.md                    # Project documentation
```

---

## 🔐 Environment Variables for Production (Vercel)

When deploying to Vercel:
1. Navigate to **Project Settings** > **Environment Variables**.
2. Add `CLOUDCONVERT_API_KEY` with your live CloudConvert API secret token.
3. Trigger a redeployment.

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!  
Feel free to open an issue or submit a pull request on the [GitHub repository](https://github.com/razazaheer12/PDF-Shift-Engine.git).

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
