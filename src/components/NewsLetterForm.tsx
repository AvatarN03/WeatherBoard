import { useState } from "react";
import toast from "react-hot-toast";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
    const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
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
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <input
        placeholder="Email"
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="px-3 py-2 rounded-lg bg-neutral-800 border border-neutral-700 text-white placeholder-neutral-500 text-sm focus:outline-none focus:ring-1 focus:ring-purple-500 w-44"
      />
      <input
        placeholder="City"
        required
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="px-3 py-2 rounded-lg bg-neutral-800 border border-neutral-700 text-white placeholder-neutral-500 text-sm focus:outline-none focus:ring-1 focus:ring-purple-500 w-32"
      />
      <button
        type="submit"
        className="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-sm font-medium transition-colors" disabled={loading}>
          {loading ? "Subscribing..." : "Subscribe"}
      </button>
    </form>
  );
}