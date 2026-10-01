<div align="center">

# 👟 SneakerSpot

### *Next-Generation E-Commerce Storefront for Sneaker Enthusiasts*

[![Live Demo](https://img.shields.io/badge/Demo-Live%20Preview-success?style=for-the-badge&logo=githubpages&logoColor=white)](https://amir-moavia.github.io/E-commerce_website/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](LICENSE)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=for-the-badge)](https://github.com/Amir-Moavia/E-commerce_website/pulls)

<br/>

 **[Live Demo](https://amir-moavia.github.io/E-commerce_website/)** •
 **[Visual Tour](#-demo--screenshots)** •
 **[Key Features](#-key-features)** •
 **[Quick Start](#-getting-started)** •
 **[Design System](#-design-system)** •
 **[Author](#-connect--author)**




---

</div>

## 🌐 Live Demo

Experience the live storefront directly on GitHub Pages:  
👉 **[https://amir-moavia.github.io/E-commerce_website/](https://amir-moavia.github.io/E-commerce_website/)**

---

## 📸 Demo & Screenshots

### Product Catalog & Storefront
<img src="images/1.png" alt="Background View - Product Catalog" width="100%">

### Interactive Product Catalog
<img src="images/2.png" alt="Products - Page" width="100%">

### Item View & Quick-Order Experience
<img src="images/3.png" alt="View and order - Page" width="100%">

---

## 📖 Overview

**SneakerSpot** is a state-of-the-art, dark-themed e-commerce storefront crafted for sneaker culture. Designed with high-performance vanilla web technologies, SneakerSpot delivers a fluid, app-like shopping experience featuring dynamic canvas constellation effects, real-time catalog search and filtering, interactive Quick-View modals, responsive cart and wishlist interactions, and slick micro-animations.

---

## ✨ Key Features

- **🌌 Dynamic Particle Constellation Canvas**  
  Custom HTML5 Canvas rendering interactive constellation particles in the background that adapt dynamically to viewport resizing and screen density.

- **⚡ Live Search & Category Filtering**  
  Filter catalog items seamlessly by brand (Nike, Jordan, Adidas, New Balance, Puma, Converse) or search by keyword with instant visual filtering.

- **👁️ Interactive Quick View Modal**  
  Detailed product inspection modal complete with multi-angle image previews, dynamic shoe size selection, stock availability indicators, customer review ratings, and direct add-to-cart capability.

- **💖 Wishlist & Cart System**  
  Real-time client-side wishlist management with animated heart states, interactive badge counters, and contextual toast alerts for cart updates.

- **📱 Fluid Responsive Architecture**  
  Mobile-first layout optimized across mobile phones, tablets, laptops, and ultra-wide desktop monitors, featuring a sliding mobile drawer menu and touch-friendly controls.

- **📊 Scroll-Triggered Counter Animations**  
  Performance metrics and trust milestones (happy customers, authentic pairs sold, rating score) brought to life with `IntersectionObserver`-powered count-up animations.

- **🚀 Zero Framework Dependencies**  
  Engineered with 100% vanilla HTML5, CSS3, and modern ES6+ JavaScript for instant load times, zero build overhead, and maximum browser compatibility.

---

## 🛠️ Technology Stack

| Layer | Technology | Details |
| :--- | :--- | :--- |
| **Markup** | HTML5 | Semantic structure, accessibility (`aria-*`), SEO meta tags |
| **Styling** | Vanilla CSS3 | Modern CSS custom properties, Flexbox, CSS Grid, Glassmorphism, animations |
| **Scripting** | JavaScript (ES6+) | Vanilla DOM manipulation, Canvas API, IntersectionObserver, event delegation |
| **Iconography** | Font Awesome 6.5.1 | Vector iconography for navigation, social links, and product metrics |
| **Typography** | Google Fonts | Premium typography pairing for high-end digital streetwear look |

---

## 🎨 Design System

SneakerSpot utilizes an intentionally curated dark luxury palette highlighted by radiant neon gradients and glassmorphism.

| Token | Value | Role |
| :--- | :--- | :--- |
| `--bg-main` | `#0b0f19` | Deep obsidian backdrop |
| `--surface` | `#111827` | Primary container surface |
| `--surface-elevated` | `#1f2937` | Elevated card & modal layer |
| `--primary-gradient` | `linear-gradient(135deg, #a855f7, #f43f5e)` | Violet-to-Rose accent glow |
| `--text-primary` | `#f9fafb` | Crisp high-contrast readable text |
| `--text-secondary` | `#9ca3af` | Muted metadata and supporting labels |
| `--border` | `rgba(255, 255, 255, 0.08)` | Subtle translucent separator borders |

---

## 📂 Project Structure

```text
SneakerSpot/
├── index.html          # Main storefront document (Header, Hero, Products, Modals, Footer)
├── styles.css          # Design system, layout rules, animations, and responsive media queries
├── script.js           # Core application logic (Canvas particles, filters, modal, cart)
├── README.md           # Project documentation and specifications
└── images/             # Product photography, screenshots, and banner media assets
    ├── 1.png           # Storefront catalog screenshot
    ├── 2.png           # Products view screenshot
    ├── 3.png           # Quick-order modal screenshot
    ├── hero_sneaker_bg.jpg
    ├── banner_collection_bg.jpg
    ├── jordan_retro_high.jpg
    ├── airforce_white_mint.jpg
    ├── dunk_low_purple.jpg
    ├── airmax97_black.jpg
    ├── nb_navy_gold.jpg
    ├── puma_rsx_pink.jpg
    ├── yeezy_orange.jpg
    └── converse_olive.jpg
```

---

## 🚀 Getting Started

No build tools, bundlers, or package managers required. You can run the application directly in any modern browser.

### 1. Clone the Repository
```bash
git clone https://github.com/Amir-Moavia/E-commerce_website.git
cd E-commerce_website
```

### 2. Run Locally

#### Option A: Direct Open
Simply double-click `index.html` or open it with your browser:
```bash
# Linux
xdg-open index.html

# macOS
open index.html

# Windows
start index.html
```

#### Option B: VS Code Live Server
1. Open the project folder in VS Code.
2. Install the **Live Server** extension (`ritwickdey.liveserver`).
3. Right-click `index.html` and click **"Open with Live Server"**.

#### Option C: Python Simple Server
```bash
# Python 3.x
python3 -m http.server 8000
```
Then visit `http://localhost:8000` in your browser.

---

## 🤝 Contributing

Contributions make the open-source community a fantastic place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. **Fork** the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m "Add some AmazingFeature"`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a **Pull Request**

---

## 👨‍💻 Connect & Author

**Amir Moavia**

[![GitHub](https://img.shields.io/badge/GitHub-Amir--Moavia-181717?style=for-the-badge&logo=github)](https://github.com/Amir-Moavia)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Amir_Moavia-0A66C2?style=for-the-badge&logo=linkedin)](https://www.linkedin.com/in/amirmoavia/)
[![Instagram](https://img.shields.io/badge/Instagram-@movi__mir-E4405F?style=for-the-badge&logo=instagram)](https://www.instagram.com/movi_mir/)
[![Facebook](https://img.shields.io/badge/Facebook-Profile-1877F2?style=for-the-badge&logo=facebook)](https://www.facebook.com/profile.php?id=100061978060282)

---
