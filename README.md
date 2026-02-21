# MetaSight

A premium, fast, and visually stunning SEO tag inspector built natively in React.

<p align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E" alt="Vite" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
</p>

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [License](#license)

## Overview

MetaSight allows you to analyze any public URL and visually inspect its core SEO metrics instantly. Instead of squinting at source code, MetaSight extracts, categorizes, and beautifully presents metadata, social cards, heading hierarchies, images, and links.

## Features

- 🔍 **Instant Analysis**: Fetch and parse HTML from any URL securely via a CORS proxy.
- 📱 **Social Previews**: See exactly how your links will appear on Google Search, Twitter, and Facebook/LinkedIn.
- 📐 **Heading Hierarchy**: Visualize your `<h1>` to `<h6>` tags to ensure content flow and accessibility.
- 🖼️ **Image Audits**: Quickly identify images missing critical `alt` text.
- 🔗 **Link Analysis**: Break down internal vs. external links and identify `nofollow` attributes.
- ✨ **Premium UI**: Built with a stunning, modern glassmorphic design and smooth micro-animations.

## Tech Stack

- **Framework**: React 18 + Vite
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Data Fetching**: Native Fetch API via `api.allorigins.win` proxy
- **HTML Parsing**: Native browser `DOMParser`

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1. Clone the repository (or navigate to your local working directory if already instantiated).
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## Usage

1. Open http://localhost:5173 in your browser.
2. Paste any valid public URL (e.g., `https://github.com` or `https://react.dev`) into the floating search bar.
3. Click **Analyze** and explore the generated dashboard.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
