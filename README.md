# WeatherBoard 🌤️

A modern, responsive weather dashboard built with **React**, **TypeScript**, and **Zustand**. Get real-time weather forecasts, current conditions, and a daily weather digest delivered straight to your inbox — every morning at 8 AM.

![WeatherBoard Screenshot](/public/dashboard-3.png)

## ✨ Features

- **Real-time weather data** from OpenWeather API
- **5-day forecast** with hourly breakdown
- **Air Quality Index (AQI)** with pollutant breakdown
- **Astronomy data** – sunrise, sunset, moon phase
- **Responsive design** – works on desktop, tablet, and mobile
- **Clean UI** with dynamic backgrounds based on weather conditions
- **Daily Weather Digest** – subscribe to receive a personalized weather email every morning at 8 AM
- **Newsletter system** – powered by Brevo and Inngest background jobs

## 🚀 Live Demo

[**View Live Demo**](https://weather-board-js.vercel.app/)

## 🛠️ Tech Stack

- **Frontend**: React 19 + TypeScript
- **State Management**: Zustand
- **Styling**: CSS Modules
- **API**: OpenWeather API
- **Build Tool**: Vite
- **Linting**: ESLint (TypeScript-aware rules)
- **Background Jobs**: [Inngest](https://inngest.com/) – cron-based daily digest trigger
- **Email**: [Brevo](https://brevo.com/) – transactional email delivery
- **Database**: MongoDB – subscriber management
- **Deployment**: Vercel (Serverless Functions)

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

3. **Get your API keys**
   - [OpenWeather](https://openweathermap.org/api) – weather data
   - [Brevo](https://brevo.com/) – email delivery
   - [Inngest](https://inngest.com/) – background job orchestration
   - [MongoDB Atlas](https://mongodb.com/atlas) – subscriber database

4. **Set up environment variables**

   Create a `.env` file in the root directory:
   ```env
   VITE_OPENWEATHER_API_KEY=your_openweather_key
   OPENWEATHER_API_KEY=your_openweather_key

   MONGODB_URI=your_mongodb_connection_string

   BREVO_API_KEY=your_brevo_api_key
   SENDER_EMAIL=your_sender_email

   INNGEST_EVENT_KEY=your_inngest_event_key
   INNGEST_SIGNING_KEY=your_inngest_signing_key

   APP_URL=http://localhost:3000
   ```

5. **Start the development servers**

   Terminal 1 – Frontend (Vite):
   ```bash
   npm run dev
   # runs on localhost:5173
   ```

   Terminal 2 – API functions (Vercel):
   ```bash
   npx vercel dev --listen 3000
   # runs on localhost:3000
   ```

   Terminal 3 – Inngest dev server:
   ```bash
   npx inngest-cli@latest dev -u http://localhost:3000/api/inngest
   # Inngest dashboard at localhost:8288
   ```

## 🧪 Scripts

- `npm run dev` – Start Vite dev server with HMR
- `npm run build` – Bundle API functions + build frontend for production
- `npm run build:api` – Bundle serverless functions with esbuild
- `npm run preview` – Preview production build locally
- `npm run lint` – Run ESLint

## 📁 Project Structure

```
WeatherBoard/
├── api/
│   ├── src/
│   │   ├── inngest.ts        # Inngest serve handler
│   │   ├── subscribe.ts      # Newsletter subscribe endpoint
│   │   └── unsubscribe.ts    # Newsletter unsubscribe endpoint
│   ├── inngest.js            # Bundled serverless function (esbuild output)
│   ├── subscribe.js
│   └── unsubscribe.js
├── inngest-fn/
│   ├── client.ts             # Inngest client
│   ├── component/
│   │   ├── SendDailyDigest.tsx  # Daily digest email template (React Email)
│   │   └── WelcomeEmail.tsx     # Welcome email template (React Email)
│   ├── functions/
│   │   ├── sendDailyDigest.ts   # Cron job – fires daily at 8 AM
│   │   └── welcomeEmail.ts      # Triggered on new subscription
│   └── lib/
│       ├── brevo.ts             # Brevo API client
│       ├── getWeatherByCoord.ts # Weather fetcher for email
│       ├── getGroupSubscribers.ts
│       ├── mongo.ts             # MongoDB connection
│       └── sendEmail.ts         # Email sender utility
├── src/
│   ├── components/           # Reusable UI components
│   ├── context/              # Zustand weather context
│   ├── actions/              # Server actions (weather, city search)
│   ├── lib/                  # Shared utilities
│   ├── types.ts
│   ├── constant.ts
│   ├── App.tsx
│   └── main.tsx
├── public/
├── index.html
├── vercel.json
├── package.json
└── README.md
```

## 📬 Newsletter & Daily Digest

WeatherBoard includes a built-in newsletter system:

- **Subscribe** – enter your email and location on the dashboard
- **Welcome Email** – sent immediately on subscription via Inngest
- **Daily Digest** – a personalized weather summary email sent every morning at **8 AM** with current conditions, forecast, and AQI for your subscribed location
- **Unsubscribe** – one-click unsubscribe link included in every email

The daily digest is powered by an **Inngest cron function** that:
1. Fetches all subscribers from MongoDB
2. Gets the current weather for each subscriber's coordinates
3. Renders a React Email template with the weather data
4. Sends the email via Brevo

## 🌐 API Reference

This project uses the [OpenWeather API](https://openweathermap.org/api):

- **Current Weather** – `https://api.openweathermap.org/data/2.5/weather`
- **5-day / 3-hour Forecast** – `https://api.openweathermap.org/data/2.5/forecast`
- **Air Quality** – `https://api.openweathermap.org/data/2.5/air_pollution`

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
- Background jobs powered by [Inngest](https://inngest.com/)
- Email delivery by [Brevo](https://brevo.com/)
- Email templates built with [React Email](https://react.email/)
- Built with [Vite](https://vitejs.dev/) + [React](https://reactjs.org/)

---

⭐️ **If you found this project helpful, give it a star on GitHub!** ⭐️