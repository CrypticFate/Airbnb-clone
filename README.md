# Airbnb Clone

A modern, responsive Airbnb homepage clone built with React, TypeScript, and Tailwind CSS. This project features a beautiful UI with property listings, category filtering, and a fully functional frontend experience.

![Airbnb Clone Preview](https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=400&fit=crop)

## ✨ Features

- **Responsive Design**: Fully responsive layout that works on all devices
- **Property Listings**: 24+ mock properties across different categories
- **Category Filtering**: Filter properties by Amazing Views, Chef's Kitchens, Luxe, Surfing, Tiny Homes, Mansions, Treehouses, Camping, Beachfront, Farms, Castles, and Islands
- **Search Functionality**: Location-based search with guest selection
- **Modern UI**: Clean, Airbnb-inspired design with smooth animations
- **SPA Routing**: Client-side routing for property details
- **Mock Data**: Realistic property data with images and ratings
- **Multi-language Support**: English and Bengali language options

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS
- **Icons**: Custom SVG icons
- **Build Tool**: Vite
- **Deployment**: Docker, Vercel, Railway

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn
- Git

### Run Locally

#### Option 1: Using npm (Recommended for development)

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd airbnb-clone
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   ```
   http://localhost:5173
   ```

#### Option 2: Using Docker

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd airbnb-clone
   ```

2. **Build and run with Docker**
   ```bash
   docker build -t airbnb-clone .
   docker run -p 5173:5173 -v $(pwd):/app airbnb-clone
   ```

3. **Or use Docker Compose**
   ```bash
   docker-compose up --build
   ```

4. **Open your browser**
   ```
   http://localhost:5173
   ```

### Build for Production

```bash
npm run build
npm run preview
```

## 📦 Dependencies

- React 18.2.0
- React Router DOM 6.8.0
- Tailwind CSS (CDN)
- TypeScript
- Vite



### Manual Deployment
```bash
npm run build
npx serve -s dist -l 3000
```

## 📁 Project Structure

```
airbnb-clone/
├── public/                 # Static assets
├── src/
│   ├── components/         # React components
│   │   ├── icons/         # SVG icon components
│   │   └── ...
│   ├── context/           # React context providers
│   ├── hooks/             # Custom React hooks
│   ├── services/          # API service functions
│   └── ...
├── index.html             # Main HTML template
├── package.json           # Dependencies and scripts
├── tailwind.config.js     # Tailwind CSS configuration
├── vite.config.ts         # Vite build configuration
└── docker-compose.yml     # Docker development setup
```

## 🎨 Key Components

- **Header**: Navigation with search functionality
- **CategoryBar**: Horizontal scrolling category filter
- **PropertyListings**: Grid layout of property cards
- **PropertyCard**: Individual property display
- **PropertyDetail**: Detailed property view
- **Footer**: Site footer with links

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

### Code Style

- TypeScript for type safety
- ESLint for code quality
- Prettier for code formatting
- Tailwind CSS for styling

## 📱 Responsive Design

The application is fully responsive with:
- Mobile-first approach
- Flexible grid layouts
- Touch-friendly interactions
- Optimized images

## 🌍 Internationalization

Supports multiple languages:
- English (en)
- Bengali (bn)

Language switching available in the header.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test with Docker
5. Submit a pull request

## 📄 License

This project is for educational purposes. Feel free to use and modify.

## 🙏 Acknowledgments

- Design inspired by Airbnb
- Images from Unsplash
- Icons created with custom SVG
- Built with modern React patterns

---

**Demo**: [Live Demo Link](https://your-deployed-url.vercel.app)

For questions or issues, please open a GitHub issue.