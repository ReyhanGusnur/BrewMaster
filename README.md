# BrewMaster ☕

A modern coffee e-commerce website built with React 19, TypeScript, and TailwindCSS.

![BrewMaster](https://img.shields.io/badge/React-19.1.0-61DAFB?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-3178C6?style=flat-square&logo=typescript)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.1.10-38B2AC?style=flat-square&logo=tailwind-css)
![Vite](https://img.shields.io/badge/Vite-6.0.5-646CFF?style=flat-square&logo=vite)

## Features

- **Premium Coffee Catalog** - Showcase of 8 high-quality coffee beans from around the world
- **Interactive Product Cards** - Smooth hover animations with lift effects
- **Product Details Modal** - Comprehensive coffee information with roasting options
- **Responsive Design** - Optimized for all device sizes
- **Authentication System** - Login and registration pages
- **Modern UI/UX** - Clean design with professional animations
- **TypeScript Support** - Full type safety throughout the application
- **Component Architecture** - Well-organized and reusable components

##  Tech Stack

- **React** 19.1.0 - Latest React with modern features
- **TypeScript** 5.8.3 - Type safety and enhanced developer experience
- **TailwindCSS** 4.1.10 - Utility-first CSS framework
- **Vite** 6.0.5 - Lightning-fast build tool
- **Lucide React** - Beautiful icon library

## Prerequisites

Before running this project, make sure you have:

- Node.js (v18 or higher)
- npm or yarn package manager

## Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/ReyhanGusnur/BrewMaster.git
   cd BrewMaster
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## 🔧 Development

### Component Guidelines

- Use TypeScript for all components
- Follow React functional component patterns
- Implement proper prop typing
- Use TailwindCSS for styling
- Ensure accessibility with proper ARIA labels

### Adding New Products

Edit `src/data/products.ts`:

```typescript
export const products: Product[] = [
  {
    id: 9,
    name: "New Coffee Origin",
    price: 29.99,
    image: "coffee-image-url",
    description: "Coffee description...",
    roastingOptions: ["Light", "Medium", "Dark"],
    origin: "Country",
    flavor: ["Flavor1", "Flavor2"]
  }
];
```

## Browser Support

- Chrome 88+
- Firefox 78+
- Safari 14+
- Edge 88+

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

##  Author

**ReyhanGusnur**
- GitHub: [@ReyhanGusnur](https://github.com/ReyhanGusnur)

## Acknowledgments

- [Unsplash](https://unsplash.com) for coffee images
- [Lucide](https://lucide.dev) for icons
- [TailwindCSS](https://tailwindcss.com) for styling
- [React](https://reactjs.org)  for the framework

---

⭐ If you found this project helpful, please give it a star!
