# 🚀 MyPDF - Free Online PDF Toolkit

A modern, fast, and secure web application for converting PDF documents to Word and vice versa.
Built with cutting-edge technologies to provide a seamless user experience.
Features drag-and-drop uploads, real-time progress tracking, and download history management.
Powered by Next.js 15, React 19, and TypeScript for optimal performance and reliability.

![Next.js](https://img.shields.io/badge/Next.js-15.2.4-black) ![React](https://img.shields.io/badge/React-19-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue) ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.17-blue)

## 📋 Table of Contents

- [✨ Features](#-features)
- [🛠️ Installation](#️-installation)
- [🚀 Usage](#-usage)
- [📁 Project Structure](#-project-structure)
- [🛠️ Technologies Used](#️-technologies-used)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

## ✨ Features

- 🔄 **PDF to Word Conversion**: Convert PDF files to editable DOCX format with high accuracy
- 🔄 **Word to PDF Conversion**: Transform Word documents (DOC/DOCX) to PDF format
- 📁 **Drag & Drop Upload**: Intuitive file upload with drag-and-drop support
- 📊 **Progress Tracking**: Real-time conversion progress with visual indicators
- 📚 **Download History**: Keep track of all your conversions and re-download files
- 🌙 **Dark/Light Theme**: Toggle between dark and light modes for better user experience
- 📱 **Responsive Design**: Fully responsive layout that works on all devices
- 🔒 **Secure Processing**: Files are processed securely and automatically deleted after conversion
- ⚡ **Lightning Fast**: Optimized for speed with minimal loading times
- 🎨 **Modern UI**: Beautiful interface built with shadcn/ui components

## 🛠️ Installation

### Prerequisites

- Node.js 18+ and npm (or pnpm/yarn)
- Git

### Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd myPDF-Converter
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   # or
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory and add your Klaviyo API key:
   ```env
   NEXT_PUBLIC_KLAVIYO_API_KEY=your_klaviyo_api_key_here
   ```

4. **Run the development server**
   ```bash
   pnpm dev
   # or
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application in action!

## 🚀 Usage

### Converting Files

1. **Upload a File**: Drag and drop your PDF or Word file onto the designated area, or click to select from your device
2. **Monitor Progress**: Watch the real-time progress bar as your file is being converted
3. **Download Result**: Once conversion is complete, click the download button to get your converted file
4. **Access History**: View all your previous conversions in the History section and re-download if needed

### Navigation

- **Home**: Main conversion interface
- **About**: Learn more about MyPDF and its features
- **Privacy**: Read our privacy policy and data handling practices
- **Contact**: Get in touch with our team
- **History**: View and manage your conversion history

### Theme Toggle

Click the sun/moon icon in the top-right corner to switch between light and dark themes. Your preference is saved locally.

## 📁 Project Structure

```
myPDF-Converter/
├── app/                    # Next.js app directory
│   ├── about/             # About page
│   ├── contact/           # Contact page
│   ├── history/           # History page
│   ├── privacy/           # Privacy page
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── components/            # Reusable UI components
│   ├── ui/               # shadcn/ui components
│   └── theme-provider.tsx # Theme provider
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions
├── public/               # Static assets
├── styles/               # Additional styles
├── .gitignore           # Git ignore rules
├── next.config.mjs      # Next.js configuration
├── package.json         # Dependencies and scripts
├── pnpm-lock.yaml       # pnpm lock file
├── postcss.config.mjs   # PostCSS configuration
├── README.md            # This file
├── tailwind.config.ts   # Tailwind CSS configuration
└── tsconfig.json        # TypeScript configuration
```

## 🛠️ Technologies Used

### Core Framework
- **Next.js 15.2.4**: React framework for production
- **React 19**: UI library
- **TypeScript 5**: Type-safe JavaScript

### Styling & UI
- **Tailwind CSS 3.4.17**: Utility-first CSS framework
- **shadcn/ui**: Modern UI components built on Radix UI
- **Lucide React**: Beautiful icons
- **next-themes**: Theme switching functionality

### Additional Libraries
- **@hookform/resolvers**: Form validation
- **react-hook-form**: Performant forms
- **zod**: TypeScript-first schema validation
- **date-fns**: Modern date utility library
- **recharts**: Chart library (if needed for future features)
- **sonner**: Toast notifications
- **vaul**: Drawer components
- **cmdk**: Command palette components

### Development Tools
- **PostCSS**: CSS processing
- **Autoprefixer**: CSS vendor prefixing
- **ESLint**: Code linting
- **TypeScript**: Type checking

### Analytics
- **Klaviyo**: Email marketing and analytics integration

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Make your changes** and ensure they follow the project's coding standards
4. **Test thoroughly** to ensure no regressions
5. **Commit your changes**: `git commit -m 'Add amazing feature'`
6. **Push to the branch**: `git push origin feature/amazing-feature`
7. **Open a Pull Request**

### Development Guidelines

- Follow TypeScript best practices
- Use Tailwind CSS for styling
- Ensure responsive design for all components
- Write meaningful commit messages
- Test on multiple browsers and devices

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Made with ❤️ by the MyPDF Team**

For questions or support, please visit our [Contact](http://localhost:3000/contact) page or email us at support@mypdf.com.

*Last updated: January 2025*
