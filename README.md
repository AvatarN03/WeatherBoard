
# WeatherBoard 🌤️

A modern, responsive weather dashboard built with **React**, **TypeScript**, and **Zustand**. Get real-time weather forecasts and current conditions with a clean, intuitive interface.

![WeatherBoard Screenshot](/public/dashboard.png)  

## ✨ Features

- **Real-time weather data** from OpenWeather API
- **5-day forecast** with hourly breakdown
- **Responsive design** – works on desktop, tablet, and mobile
- **Clean UI** with dynamic backgrounds based on weather conditions

## 🚀 Live Demo

[**View Live Demo**](https://weather-board-js.vercel.app/) 

## 🛠️ Tech Stack

- **Frontend**: React 19 + TypeScript
- **State Management**: Zustand
- **Styling**: CSS Modules
- **API**: OpenWeather API
- **Build Tool**: Vite
- **Linting**: ESLint (TypeScript-aware rules)

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/AvatarN03/WeatherBoard.git
   cd WeatherBoard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Get an API key**
   - Sign up at [OpenWeather](https://openweathermap.org/api)
   - Copy your API key

4. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   VITE_OPENWEATHER_API_KEY=your_api_key_here
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

## 🧪 Scripts

- `npm run dev` – Start dev server with HMR
- `npm run build` – Build for production
- `npm run preview` – Preview production build locally
- `npm run lint` – Run ESLint

## 📁 Project Structure

```
WeatherBoard/
├── src/
│   ├── components/     # Reusable UI components
│   ├── stores/         # Zustand state stores
│   ├── services/       # API calls and data formatting
│   ├── types/          # TypeScript type definitions
│   ├── utils/          # Helper functions
│   ├── App.tsx
│   └── main.tsx
├── public/
├── index.html
├── package.json
└── README.md
```

## 🌐 API Reference

This project uses the [OpenWeather API](https://openweathermap.org/api):
- **Current Weather Data** – `https://api.openweathermap.org/data/2.5/weather`
- **5-day / 3-hour Forecast** – `https://api.openweathermap.org/data/2.5/forecast`

## 📱 Responsive Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px – 1024px
- **Desktop**: > 1024px

## 🤝 Contributing

Contributions are welcome! Please:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the **MIT License**.

## 👤 Author

**Prashanth Naidu** (AvatarN03)
- GitHub: [@AvatarN03](https://github.com/AvatarN03)
- Project Link: [https://github.com/AvatarN03/WeatherBoard](https://github.com/AvatarN03/WeatherBoard)

## 🙏 Acknowledgments

- Weather data provided by [OpenWeather](https://openweathermap.org/)
- Built with [Vite](https://vitejs.dev/) + [React](https://reactjs.org/)

---

⭐️ **If you found this project helpful, give it a star on GitHub!** ⭐️

