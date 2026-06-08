import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useWeather from "../context/useWeather";

export default function NewsletterForm() {

  const { weatherData } = useWeather();

  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log(weatherData);
    setCity(weatherData?.location.city + ", " + weatherData?.location.country || "");
  }, [weatherData]);

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, city, lat: weatherData?.location.lat, lon: weatherData?.location.lon }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Something went wrong");
      } else {
        toast.success("Subscribed! Check your inbox 🎉");
        setEmail("");
      }
    } catch {
      toast.error("Network error, please try again");
    } finally {
      setLoading(false);
    }
  };

  
  return (
    <>
      <h1 className="text-2xl text-yellow-300">NewsLetter</h1>
      <p className="text-neutral-400">Subscribe to our newsletter to get the latest updates!</p>
      <form onSubmit={handleSubmit} className="flex items-center gap-4 w-full flex-col my-4 px-4">
        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="email" className="">Email</label>
          <input
            placeholder="Email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-3 py-2 rounded-lg bg-purple-700/20 border border-neutral-700 text-white placeholder-neutral-500 text-sm focus:outline-none focus:ring-1 focus:ring-purple-500 w-full"
          />
        </div>

        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="city" className="">City</label>
          <input
            id="city"
            placeholder="City"
            disabled
            value={city}
            className="px-3 py-2 rounded-lg bg-purple-700/20 border border-neutral-700 text-white placeholder-neutral-500 text-sm focus:outline-none focus:ring-1 focus:ring-purple-500 w-full cursor-not-allowed"
          />
        </div>

        <button
          type="submit"
          className="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-sm font-medium transition-colors block ml-auto cursor-pointer" disabled={loading}>
          {loading ? "Subscribing..." : "Subscribe"}
        </button>
      </form >
    </>
  );
}