# 🦁 CatVault — Premium Feline Registry

CatVault is a state-of-the-art, high-performance cat record management portal. Designed for a Mid-Level Senior engineering standard, it showcases the latest capabilities of the Angular ecosystem while delivering a stunning, vibrant user experience.

## 🚀 Key Features & Approach

### 🏗️ Architecture & Core Logic
- **Framework**: Developed using **Angular 19.2.1** (Latest Stable).
- **Standalone Architecture**: 100% modular, fully standalone components with zero `NgModules` for a modern, lightweight footprint.
- **Signals Throughout**: Reactive state management is handled entirely via **Angular Signals** and `computed` values, ensuring fine-grained, ultra-fast UI updates.
- **Zoneless Change Detection**: Configured for **Zoneless** performance, removing the overhead of `zone.js` for a snappier, more efficient application.
- **Strict TypeScript**: Developed with strict typing and `noImplicitAny` to ensure enterprise-grade reliability.

### 🎨 Design & UX Approach
- **Theme**: A premium **Bright White & Vibrant Orange** palette, moving away from generic dark themes to a professional, high-end "Gold/Orange" aesthetic.
- **Glassmorphism**: Integrated glass-morphic surfaces with heavy backdrop blurs (`backdrop-filter`) for a modern, depth-focused look.
- **Micro-Animations**: Butter-smooth motions powered by **AOS (Animate On Scroll)** and **Animate.css**.
- **Responsive Layout**: Mobile-first design using **Bootstrap Grid** and custom SCSS flex/grid helpers to ensure perfectly fluid layouts across Desktop, iPad, and Mobile.
- **UX Polish**: Includes custom skeleton loading states, interactive hover glows, and a fixed, glossy scrolling header.

### 🔌 API Integration
- **Proxy Configuration**: Implemented a local `proxy.conf.json` to seamlessly bypass `CORS` restrictions while connecting to the target AWS Lambda/DynamoDB endpoints.
- **Adaptive Data Mapping**: The `CatService` includes intelligent mapping to handle the nested JSON structures (`status_code`, `data`, `info`) returned by the cloud backend.

## 🛠️ Tech Stack & Packages

- **Angular 19** (Core Framework)
- **Angular Material** (Iconography & Modal System)
- **Bootstrap 5.3** (Responsive Grid)
- **AOS (Animate On Scroll)** (Scroll Animations)
- **Animate.css** (Micro-animations)
- **RxJS** (Reactive Streams)
- **Signals** (State Tracking)

## 📦 Getting Started

### 1. Installation
Clone the repository and install dependencies:
```bash
npm install
```

### 2. Running Locally (Important)
Because the app uses a **Proxy** to handle API requests and bypass CORS, you MUST use the following command to start the development server:

```bash
npm start
```
*Note: This runs `ng serve --proxy-config proxy.conf.json` under the hood.*

### 3. Usage
- **View Records**: The landing page automatically fetches and lists all cats from the registry.
- **Search**: Use the real-time search bar to filter by name or description.
- **Add/Edit**: Use the "Add Record" button or card actions to manage feline entries via the premium modal form.

---
*Created as part of a Senior Engineering Assessment.*
